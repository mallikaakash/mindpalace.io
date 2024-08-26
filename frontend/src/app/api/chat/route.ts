import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   // Here, you would typically send the messages to your LLaMa model or other backend service
//   // For this example, we'll just echo the last message
//   const lastMessage = messages[messages.length - 1];
//   const response = `Echoing: ${lastMessage.content}`;

//   // In a real implementation, you'd process the messages and generate a response

//   return NextResponse.json({ response });
// }


export async function POST(req: Request) {
    const { messages } = await req.json();
  
    try {
      // Send the messages to your backend server
      const backendResponse = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });
  
      if (!backendResponse.ok) {
        throw new Error('Backend server error');
      }
  
      const data = await backendResponse.json();
      return NextResponse.json({ response: data.response });
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ error: 'Failed to get response from the chatbot' }, { status: 500 });
    }
  }