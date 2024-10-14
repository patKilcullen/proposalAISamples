import { ChatOpenAI } from "langchain/chat_models/openai";
import dotenv from "dotenv";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";
dotenv.config();

const chat = new ChatOpenAI({

  temperature: 0,
});



export const generateProposal = async ({
  businessInfo,
  proposalInfo,
  clientInfo,
  title
}) => {
  const {
    businessName,
    businessOverview,
    businessEmail,
    businessAddress,
    businessUrl,
    businessIndustry,
    businessServices,
    businessType,
    businessRepName,
    businessRepRole,
    businessRepEmail,
  } = businessInfo;

  const {
    scopeOfWork,
    previousSuccessStory,
    projectTimeline,
    budgetAndPricing,
    deliverables,
    clientGoals,
    uniqueSellingPosition,
    termsAndConditions,
    clientResponsibilities,
  } = proposalInfo;

  const {
    clientName,
    clientContact,
    clientEmail,
    clientMobile,
    clientAddress,
    clientBusinessOverview,
    clientBusinessIndustry,
    clientBusinessServices,
    clientBusinessType,
    clientBusinessRepName,
    clientBusinessRepRole,
    clientBusinessRepEmail,
    clientUrl,
  } = clientInfo;
console.log("TTILE : ", title)
  const proposalPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `hidden`
    ),
    HumanMessagePromptTemplate.fromTemplate(
      `hidden
        `
    ),
  ]);

  const chain = new LLMChain({
    prompt: proposalPrompt,
    llm: chat,
  });

  const response = await chain.call({
    business: businessName,
    business_overview: businessOverview,
    business_industry: businessIndustry,
    business_email: businessEmail,
    business_address: businessAddress,
    business_url: businessUrl,
    scope_of_work: scopeOfWork,
    project_timeline: projectTimeline,
    budget_and_pricing: budgetAndPricing,
    deliverables: deliverables,
    client_goal: clientGoals,
    unique_selling_position: uniqueSellingPosition,
    terms_and_conditions: termsAndConditions,
    client_responsibilities: clientResponsibilities,
    previous_success_story: previousSuccessStory,
    client: clientName,
    client_contact: clientContact,
    client_email: clientEmail,
    client_mobile: clientMobile,
    client_address: clientAddress,
  });

  return response.text;
};

export const updatePara = async (para, conditions) => {
  const proposalPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "You are a helpful assistant help to rewriting the text according to given conditions"
    ),

    HumanMessagePromptTemplate.fromTemplate(
      "text: {text}, conditions: {conditions}"
    ),
  ]);

  const chain = new LLMChain({
    prompt: proposalPrompt,
    llm: chat,
  });

  const response = await chain.call({ text: para, conditions: conditions });

  return response.text;
};

export const generate = async (prompt) => {
  const proposalPrompt = ChatPromptTemplate.fromTemplate([
    SystemMessagePromptTemplate.fromTemplate(
      "You are a helpful assistant help to generate content for a business proposal according to the prompt"
    ),

    HumanMessagePromptTemplate.fromTemplate("promt: {text}"),
  ]);

  const chain = new LLMChain({
    prompt: proposalPrompt,
    llm: chat,
  });

  const response = await chain.call({ text: prompt });

  return response.text;
};
