import { Vonage } from "@vonage/server-sdk";

const vonage = new Vonage({
  apiKey: "5835f087", 
  apiSecret: "kH4yIVbvZ9Z4oEql"
});


const from = "VonageSMS";
const to = "+50230024418";
const text = 'Mensaje de prueba desde Vonage SMS API';


async function sendSMS() {
    console.log("📤 Intentando enviar SMS...");
    
    try {
        const response = await vonage.sms.send({ to, from, text });
        
        console.log('✅ Mensaje enviado exitosamente');
        console.log('📋 Respuesta:', response);
        
        // Analizar respuesta específica de Vonage
        if (response.messages && response.messages.length > 0) {
            const message = response.messages[0];
            console.log('📊 Estado:', message.status);
            console.log('🔍 ID del mensaje:', message['message-id']);
            
            if (message.status !== '0') {
                console.log('❌ Error:', message['error-text']);
            }
        }
        
    } catch (error) {
        console.log('❌ Error enviando mensaje:');
        
        // Mostrar detalles específicos del error
        if (error.body) {
            console.error('Código de error:', error.body.status);
            console.error('Mensaje:', error.body.detail);
        } else {
            console.error('Error completo:', error);
        }
    }
}

// 4. VERIFICAR CREDENCIALES primero
async function testCredentials() {
    console.log("🔐 Verificando credenciales...");
    
    try {
        // Verificar balance (esto prueba las credenciales)
        const balance = await vonage.accounts.getBalance();
        console.log('✅ Credenciales válidas');
        console.log('💰 Saldo actual:', balance.value, balance.currency);
        
        // Si hay saldo, enviar SMS
        if (balance.value > 0) {
            await sendSMS();
        } else {
            console.log('❌ Saldo insuficiente. Recarga tu cuenta Vonage.');
        }
        
    } catch (error) {
        console.log('❌ Error de autenticación:');
        console.log('Las credenciales de Vonage son incorrectas o inválidas');
        console.log('Visita: https://dashboard.nexmo.com/ para obtener tus credenciales reales');
    }
}

// Ejecutar verificación
testCredentials();