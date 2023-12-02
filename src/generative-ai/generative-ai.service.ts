import { Injectable } from '@nestjs/common';
import { helpers, v1 } from '@google-cloud/aiplatform';
const { PredictionServiceClient } = v1;

@Injectable()
export class GenerativeAiService {
  private client: InstanceType<typeof PredictionServiceClient>;

  constructor() {
    // Initialize Google AI Platform Prediction Service Client
    this.client = new PredictionServiceClient({
      keyFilename: '/credentials.json',
    });
  }

  async assistWithDescription(data: string): Promise<string> {
    try {
      const projectId = 'modular-magpie-406813';
      const location = 'us-central1'; // Change this based on your model's location
      const endpointId = 'us-central1-aiplatform.googleapis.com';

      const prompt = {
        prompt: 'what are the 10 largest cities in Europe?',
      };
      const instanceValue = helpers.toValue(prompt);
      const instances = [instanceValue] as protobuf.common.IValue[];

      const request = {
        endpoint: `projects/${projectId}/locations/${location}/endpoints/${endpointId}`,
        instances: instances,
        parameters: {
          structValue: {
            fields: {
              candidateCount: { numberValue: 1 },
              maxOutputTokens: { numberValue: 1024 },
              temperature: { numberValue: 0.2 },
              topP: { numberValue: 0.8 },
              topK: { numberValue: 40 },
            },
          },
        },
      };

      const response = await this.client.predict(request);

      // Adjust based on response structure
      return response[0].predictions[0].stringValue;
    } catch (error) {
      console.error('Error in generating text: ', error);
      throw new Error('Failed to generate text');
    }
  }
}
