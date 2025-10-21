// supabase/functions/gemini-proxy/index.ts (Version Finale et Robuste)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from 'npm:@google/generative-ai@0.15.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error("La variable GEMINI_API_KEY n'est pas définie dans les secrets du projet Supabase.");
    }
    const ai = new GoogleGenerativeAI(geminiApiKey);
    
    const bodyReceived = await req.json();
    console.log('[gemini-proxy] Body reçu:', bodyReceived);
    const { modelName, prompt, config, responseMimeType } = bodyReceived;
    if (!modelName || !prompt) {
      return new Response(JSON.stringify({ error: "Paramètres 'modelName' et 'prompt' requis." }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const model = ai.getGenerativeModel({
      model: modelName,
      safetySettings,
      generationConfig: config,
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    
    // Vérifier si la réponse contient des données d'image
    if (response.candidates && response.candidates[0]?.content?.parts) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData) {
          // Retourner directement la structure avec imageBytes pour compatibilité
          return new Response(JSON.stringify({ 
            candidates: response.candidates,
            imageBytes: part.inlineData.data 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          });
        }
      }
    }
    
    // Traitement texte standard
    const text = response.text();
    
    // Si responseMimeType est 'text/plain', retourner directement le texte
    if (responseMimeType === 'text/plain') {
      return new Response(text, {
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
        status: 200,
      });
    }
    
    // Si responseMimeType est 'application/json', parser et retourner l'objet
    if (responseMimeType === 'application/json') {
      let body;
      try {
        body = JSON.parse(text);
      } catch {
        body = { result: text };
      }
      return new Response(JSON.stringify(body), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }
    
    // Par défaut, retourner la structure complète pour compatibilité
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    let errorMessage = "Une erreur inconnue est survenue.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("--- ERREUR ATTRAPÉE DANS LE CATCH ---", error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});