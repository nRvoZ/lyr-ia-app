// =====================================================
// DIAGNOSTIC PROBLÈME INSCRIPTION
// =====================================================
// Script pour diagnostiquer pourquoi la création de compte échoue
// Date: 21 octobre 2025

import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SERVICE_KEY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function diagnoseRegistrationIssue(email, username) {
    console.log('🔍 DIAGNOSTIC INSCRIPTION');
    console.log('========================');
    console.log(`Email: ${email}`);
    console.log(`Username: ${username}`);
    console.log('');

    try {
        // 1. Vérifier auth.users
        console.log('1️⃣ Vérification auth.users...');
        const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
        
        if (authError) {
            console.log('❌ Erreur auth.users:', authError.message);
        } else {
            const userExists = authUsers.users.find(u => u.email === email);
            if (userExists) {
                console.log('⚠️  Utilisateur trouvé dans auth.users:');
                console.log(`   - ID: ${userExists.id}`);
                console.log(`   - Email confirmé: ${userExists.email_confirmed_at ? 'Oui' : 'Non'}`);
                console.log(`   - Créé le: ${userExists.created_at}`);
            } else {
                console.log('✅ Email non trouvé dans auth.users');
            }
        }

        // 2. Vérifier user_profiles
        console.log('\n2️⃣ Vérification user_profiles...');
        const { data: profiles, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .or(`email.eq.${email},username.eq.${username}`);

        if (profileError) {
            console.log('❌ Erreur user_profiles:', profileError.message);
        } else {
            if (profiles && profiles.length > 0) {
                console.log('⚠️  Profils trouvés:');
                profiles.forEach(profile => {
                    console.log(`   - ID: ${profile.id}`);
                    console.log(`   - Email: ${profile.email}`);
                    console.log(`   - Username: ${profile.username}`);
                    console.log(`   - Plan: ${profile.plan}`);
                });
            } else {
                console.log('✅ Aucun profil trouvé');
            }
        }

        // 3. Vérifier les contraintes uniques
        console.log('\n3️⃣ Vérification contraintes...');
        const { data: constraints, error: constraintError } = await supabase
            .rpc('get_table_constraints', { table_name: 'user_profiles' });

        if (constraintError) {
            console.log('❌ Erreur contraintes:', constraintError.message);
        } else {
            console.log('📋 Contraintes trouvées:');
            console.log(JSON.stringify(constraints, null, 2));
        }

        // 4. Test de création de profil
        console.log('\n4️⃣ Test création profil...');
        const testProfile = {
            id: 'test-' + Date.now(),
            email: email,
            username: username + '-test',
            plan: 'Free',
            credits: 150,
            is_admin: false,
            is_banned: false,
            achievements: {}
        };

        const { data: insertData, error: insertError } = await supabase
            .from('user_profiles')
            .insert(testProfile)
            .select();

        if (insertError) {
            console.log('❌ Erreur insertion test:', insertError.message);
            console.log('   Code:', insertError.code);
            console.log('   Détails:', insertError.details);
        } else {
            console.log('✅ Insertion test réussie');
            
            // Nettoyer le test
            await supabase
                .from('user_profiles')
                .delete()
                .eq('id', testProfile.id);
            console.log('🧹 Test nettoyé');
        }

    } catch (error) {
        console.log('❌ Erreur générale:', error.message);
    }
}

// Exécuter le diagnostic
diagnoseRegistrationIssue('lyria.teazm@gmail.com', 'lyria.teazm');
