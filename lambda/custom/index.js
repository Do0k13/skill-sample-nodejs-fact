/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Lo siento, ha ocurrido un error.')
      .reprompt('Lo siento, ha ocurrido un error.')
      .getResponse();
  },
};

const SKILL_NAME = 'Datos Blockchain';
const GET_FACT_MESSAGE = 'Aquí está un dato: ';
const HELP_MESSAGE = 'Puedes decir dime un dato blockchain,o puedes decir salir... ¿Cómo puedo ayudarte?';
const HELP_REPROMPT = '¿Cómo puedo ayudarte?';
const STOP_MESSAGE = '¡Adiós!';

const data = [
  'Las blockchain pueden ser públicas o privadas.',
  'En términos de su desarrollo, blockchain es dónde el internet estaba hace 20 años.',
  'Sólo uno por ciento de la población mundial está usando blockchain ahora.',
  'Hay inversiones considerables por los actuales gigantes tecnológicos cómo IBM y Microsoft en la tecnología blockchain.',
  'Durante los últimos 5 años, capitales de riesgo han invertido más de un billón de dólares en compañías blockchain.',
  'El mercado global de blockchain se espera que esté valuado en 20 billones de dólares.',
  'Blockchain es altamente transparente, debido a que cualquiera con acceso a una blockchain puede ver el historial completo de transacciones.',
  'Similar a Google docs, todos los participantes dentro de la red pueden ver los cambios en los registros.',
  'El libro contable es constantemente actualizado y cada participante tiene su propia copia de éste.',
  'Una blockchain es más vulnerable a una brecha de seguridad cuando sale por primera vez en línea.',
  'Nueve de diez personas están de acuerdo que blockchain va a ser disruptiva en la industria financiera y en la banca.',
  'Un tercio de ejecutivos de nivel C están considerando adoptar o ya están usando tecnología blockchain.',
  'Justo cómo el internet, habrá trabajos que llegarán a ser obsoletos.',
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
