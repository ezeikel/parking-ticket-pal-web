import { extractOCRTextWithVision } from '@/app/actions/ocr';

// longer duration to account for openai api calls
export const maxDuration = 60;

export const POST = async (req: Request) => {
  // account for image upload via form data or as base64 string
  let data:
    | FormData
    | {
        scannedImage: string;
        ocrText?: string;
      };

  const contentType = req.headers.get('Content-Type') || '';

  // handle form data and base64 string
  if (contentType.includes('multipart/form-data')) {
    data = await req.formData();
  } else if (contentType.includes('application/json')) {
    const json = await req.json();
    data = {
      scannedImage: json.scannedImage,
      ocrText: json.ocrText,
    };
  } else {
    // return error for unsupported content type i.e. not form data or json
    return new Response(
      JSON.stringify({ success: false, message: 'Unsupported content type' }),
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Content-Type': 'application/json',
        },
        status: 400,
      },
    );
  }

  // upload image for processing
  const result = await extractOCRTextWithVision(data);

  // return success response with parsed data
  return new Response(JSON.stringify(result), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    },
    status: 200,
  });
};
