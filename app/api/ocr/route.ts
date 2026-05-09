import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert the image file to a base64 string
    const buffer = await file.arrayBuffer();
    const imageAsBase64 = Buffer.from(buffer).toString('base64');

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      // This error will happen if you haven't created the .env.local file
      // or if you have a typo in the variable name.
      throw new Error('Google API key is not configured in .env.local');
    }

    const requestBody = {
      requests: [
        {
          image: {
            content: imageAsBase64,
          },
          features: [
            {
              type: 'TEXT_DETECTION',
            },
          ],
        },
      ],
    };

    // This is the endpoint for the Google Vision API
    const apiResponse = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!apiResponse.ok) {
      const errorBody = await apiResponse.json();
      console.error('Google Vision API error:', errorBody);
      return NextResponse.json({ error: 'Google Vision API request failed' }, { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    
    // The full block of text detected in the image
    const fullText = data.responses[0]?.fullTextAnnotation?.text;

    if (!fullText) {
        return NextResponse.json({ text: '' });
    }

    // We send the raw text back to the frontend for parsing
    return NextResponse.json({ text: fullText });

  } catch (error) {
    console.error('Error in OCR route:', error);
    // It's good practice to not expose detailed error messages to the client
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
