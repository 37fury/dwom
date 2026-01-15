const { createClient } = require('@supabase/supabase-js');

// Mock data
const conversation = {
    participant_ids: ['u1', 'u2'], // Assuming u1 is current user
    last_message_at: new Date().toISOString()
};

console.log('Use Supabase SQL Editor to insert:', `
INSERT INTO public.conversations (participant_ids) VALUES ('{"u1", "u2"}');
`);
