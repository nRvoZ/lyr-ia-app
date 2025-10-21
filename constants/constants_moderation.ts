// This file contains constants related to content and user moderation.

export const FORBIDDEN_USERNAMES: string[] = [
    // Reserved Roles
    'admin', 'administrator', 'administrateur', 'aide', 'ceo', 'contact', 'conseiller', 'counselor', 'cto', 'dev', 'developer', 'équipe', 'fondateur', 'founder', 'guide', 'helper', 'info', 'lyria', 'media', 'mod', 'moderator', 'modérateur', 'owner', 'presse', 'press', 'propriétaire', 'root', 'staff', 'superadmin', 'superuser', 'support', 'sysadmin', 'team',

    // Common impersonation
    'allah', 'ange', 'angel', 'bot', 'démon', 'demon', 'devil', 'diable', 'dieu', 'god', 'jesus', 'lucifer', 'messie', 'messiah', 'official', 'officiel', 'prophète', 'prophet', 'robot', 'satan', 'system', 'système',

    // Offensive/Generic placeholders
    'anonyme', 'anonymous', 'demo', 'guest', 'invité', 'joueur', 'membre', 'member', 'nobody', 'nomdutilisateur', 'personne', 'player', 'quelquun', 'somebody', 'test', 'user', 'username', 'utilisateur',

    // French Swear Words & Offensive Terms
    'abruti', 'andouille', 'ane', 'baltringue', 'batard', 'bâtard', 'bite', 'bouffon', 'bougnoule', 'boulet', 'bourricot', 'branleur', 'burnes', 'casse-couilles', 'charogne', 'chatte', 'chiasse', 'chier', 'chiant', 'chinetoque', 'clochard', 'clodo', 'con', 'connard', 'connasse', 'conne', 'couilles', 'couillon', 'crétin', 'crevard', 'cul', 'daesh', 'débile', 'déconner', 'dégage', 'dégueulasse', 'ducon', 'emmerder', 'emmerdeur', 'emmerdeuse', 'encule', 'enculé', 'enfoiré', 'fdp', 'fiotte', 'fils de pute', 'fumier', 'garce', 'gestapo', 'gitan', 'gland', 'glandeur', 'gogol', 'gouine', 'gros con', 'grosse conne', 'gueule', 'hitler', 'imbécile', 'isis', 'lavette', 'lopette', 'mal baisé', 'mal baisée', 'mange-merde', 'merde', 'merdeux', 'minable', 'mongol', 'moron', 'nazi', 'naze', 'négro', 'nique', 'niquer', 'nul', 'pauvre con', 'pd', 'pédé', 'pignouf', 'pisse', 'plouc', 'porc', 'poufiasse', 'pourriture', 'punaise', 'putain', 'pute', 'raciste', 'reich', 'sac à merde', 'salaud', 'saligaud', 'salope', 'ss', 'suceur', 'suceuse', 'ta gueule', 'tafiole', 'tarlouze', 'tg', 'tocard', 'triso', 'trou du cul', 'trouduc', 'va te faire foutre', 'va te faire mettre', 'youpin', 'zob', 'zizi',

    // English Swear Words & Offensive Terms
    'alqaeda', 'arse', 'arsehole', 'ass', 'asshole', 'aryan', 'bastard', 'bellend', 'berk', 'bitch', 'blighter', 'bloody', 'bollocks', 'bugger', 'choad', 'clit', 'cock', 'cocksucker', 'coochie', 'cooze', 'crap', 'cum', 'cumshot', 'cumstain', 'cunt', 'damn', 'dick', 'dickhead', 'dildo', 'dipshit', 'douchebag', 'dumbass', 'dyke', 'ejaculate', 'erection', 'fag', 'faggot', 'felch', 'fellatio', 'flaps', 'fuck', 'fucker', 'fucking', 'fudge packer', 'gash', 'goddamn', 'gook', 'handjob', 'heeb', 'hell', 'hitler', 'homo', 'horny', 'incest', 'isis', 'jackass', 'jerk', 'jizz', 'jungle bunny', 'kike', 'kkk', 'knob', 'knobhead', 'kys', 'labia', 'lesbo', 'lmao', 'lmfao', 'masturbate', 'mf', 'milf', 'minge', 'molest', 'motherfucker', 'muff', 'munter', 'nazi', 'nigga', 'nigger', 'nonce', 'nutsack', 'paedo', 'pedophile', 'penis', 'piss', 'poon', 'porn', 'prick', 'pussy', 'queer', 'racist', 'rape', 'rapist', 'retard', 'retarded', 'scrote', 'scrotum', 'semen', 'shag', 'shemale', 'shit', 'shitface', 'shlong', 'skank', 'slut', 'smegma', 'snatch', 'son of a bitch', 'spastic', 'sperm', 'spic', 'splooge', 'spunk', 'swastika', 'tard', 'testicle', 'threesome', 'tit', 'tits', 'titties', 'titty', 'turd', 'twat', 'twunt', 'vagina', 'viagra', 'vulva', 'wank', 'wanker', 'wetback', 'whore', 'willy', 'wtf',

    // Spanish Swear Words & Offensive Terms
    'cabron', 'pendejo', 'puta', 'puto', 'mierda', 'joder', 'coño', 'gilipollas', 'hijo de puta', 'maricon', 'chinga', 'pendeja', 'culero', 'mamón', 'verga', 'capullo', 'imbecil', 'zorra', 'cipote', 'polla', 'carajo',

    // German Swear Words & Offensive Terms
    'arschloch', 'wichser', 'scheisse', 'fick dich', 'fotze', 'hurensohn', 'miststück', 'arschgesicht', 'sau', 'verpiss dich', 'scheißkopf', 'schwanzlutscher', 'depp', 'idiot', 'trottel', 'vollidiot', 'mistkerl',

    // Italian Swear Words & Offensive Terms
    'cazzo', 'stronzo', 'vaffanculo', 'merda', 'puttana', 'figlio di puttana', 'coglione', 'frocio', 'rompipalle', 'testa di cazzo', 'bastardo', 'deficiente', 'scemo', 'inculare', 'troia',

    // Portuguese Swear Words & Offensive Terms
    'caralho', 'puta', 'merda', 'foda-se', 'filho da puta', 'bosta', 'cu', 'viado', 'porra', 'cabrão', 'desgraça', 'idiota', 'otario', 'cacete', 'buceta', 'arrombado',

    // Russian (Transliterated) Swear Words & Offensive Terms
    'suka', 'blyat', 'huy', 'pizdec', 'gandon', 'mudak', 'govno', 'yobany', 'chmo', 'dolboyob', 'khuy', 'pizda', 'blyad', 'sukin sin', 'pedik', 'urod', 'zhopa', 'zasranets',

    // Russian (Cyrillic) Swear Words & Offensive Terms
    'сука', 'блять', 'хуй', 'пиздец', 'гандон', 'мудак', 'говно', 'ёбаный', 'чмо', 'долбоёб', 'пизда', 'блядь', 'сукин сын', 'педик', 'урод', 'жопа', 'засранец', 'ублюдок', 'шлюха', 'хер',

    // Japanese (Transliterated) Swear Words & Offensive Terms
    'baka', 'aho', 'kuso', 'shine', 'chikusho', 'temee', 'kisama', 'urusai', 'manuke', 'yarou', 'busu', 'doke', 'gomi', 'hentai', 'kuzu', 'kimoi', 'tako',

    // Japanese (Native Script) Swear Words & Offensive Terms
    '馬鹿', 'ばか', 'アホ', 'あほ', 'くそ', 'クソ', '死ね', 'しね', 'ちくしょう', 'てめえ', '貴様', 'うるさい', '間抜け', '野郎', 'ブス', 'どけ', 'ゴミ', '変態', 'クズ', 'キモい', 'タコ', '糞', '阿呆', '畜生',
];
