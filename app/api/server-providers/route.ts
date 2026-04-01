import {
  getServerProviders,
  getServerTTSProviders,
  getServerASRProviders,
  getServerPDFProviders,
  getServerImageProviders,
  getServerVideoProviders,
  getServerWebSearchProviders,
} from '@/lib/server/provider-config';
import { apiError, apiSuccess } from '@/lib/server/api-response';
import { createLogger } from '@/lib/logger';

const log = createLogger('ServerProviders');

export async function GET() {
  try {
    const providers = getServerProviders();
    const tts = getServerTTSProviders();
    const asr = getServerASRProviders();
    const pdf = getServerPDFProviders();
    const image = getServerImageProviders();
    const video = getServerVideoProviders();
    const webSearch = getServerWebSearchProviders();
    
    log.info('Server providers API called', {
      providersCount: Object.keys(providers).length,
      ttsCount: Object.keys(tts).length,
      asrCount: Object.keys(asr).length,
      pdfCount: Object.keys(pdf).length,
      imageCount: Object.keys(image).length,
      videoCount: Object.keys(video).length,
      webSearchCount: Object.keys(webSearch).length,
    });
    
    return apiSuccess({
      providers,
      tts,
      asr,
      pdf,
      image,
      video,
      webSearch,
    });
  } catch (error) {
    log.error('Error fetching server providers:', error);
    return apiError(
      'INTERNAL_ERROR',
      500,
      error instanceof Error ? error.message : 'Unknown error',
    );
  }
}
