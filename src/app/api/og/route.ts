import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const title = searchParams.get('title') || 'Article'
        const category = searchParams.get('category') || 'Blog'
        const date = searchParams.get('date') || new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })

        return new ImageResponse(
            (
                <div
          style= {{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: '#000',
            padding: '80px',
            fontFamily: 'system-ui, sans-serif',
        }}
        >
        {/* Gradient Background */ }
        < div
    style = {{
        position: 'absolute',
            top: 0,
                left: 0,
                    right: 0,
                        bottom: 0,
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
            }
}
          />

{/* Header */ }
<div style={ { display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 } }>
    <div
              style={
    {
        fontSize: '32px',
            fontWeight: 'bold',
                color: '#fff',
                    letterSpacing: '-0.02em',
              }
}
            >
    Views
    </div>
    < div
style = {{
    fontSize: '16px',
        color: '#6b7280',
              }}
            >
    by Amish B Harsoor
        </div>
        </div>

{/* Main Content */ }
<div style={ { display: 'flex', flexDirection: 'column', gap: '24px', zIndex: 1, maxWidth: '900px' } }>
    {/* Category Badge */ }
    < div
style = {{
    display: 'inline-flex',
        padding: '8px 20px',
            backgroundColor: '#1f2937',
                color: '#9ca3af',
                    borderRadius: '9999px',
                        fontSize: '18px',
                            fontWeight: '500',
                                width: 'fit-content',
              }}
            >
    { category }
    </div>

{/* Title */ }
<div
              style={
    {
        fontSize: '64px',
            fontWeight: 'bold',
                color: '#fff',
                    lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                            display: '-webkit-box',
                                WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
              }
}
            >
    { title }
    </div>
    </div>

{/* Footer */ }
<div
            style={
    {
        display: 'flex',
            alignItems: 'center',
                gap: '16px',
                    zIndex: 1,
                        color: '#6b7280',
                            fontSize: '20px',
            }
}
          >
    <div>{ date } </div>
    <div>•</div>
        < div > views.amish.dev </div>
        </div>
        </div>
      ),
{
    width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    console.error(e)
    return new Response('Failed to generate image', { status: 500 })
}
}
