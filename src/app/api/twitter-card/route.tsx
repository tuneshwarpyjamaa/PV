import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const title = searchParams.get('title') || 'Article'
        const category = searchParams.get('category') || 'Blog'
        const excerpt = searchParams.get('excerpt') || ''
        const date = searchParams.get('date') || new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })

        return new ImageResponse(
            (
                <div style={{height:'100%',width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'space-between',backgroundColor:'#000',padding:'60px',fontFamily:'system-ui, sans-serif',position:'relative'}}>
                    <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 50%, rgba(236, 72, 153, 0.15) 100%)'}} />
                    <div style={{position:'absolute',top:0,right:0,width:'300px',height:'300px',background:'radial-gradient(circle at top right, rgba(147, 51, 234, 0.2), transparent)'}} />
                    <div style={{display:'flex',flexDirection:'column',gap:'12px',zIndex:1}}>
                        <div style={{fontSize:'28px',fontWeight:'bold',color:'#fff',letterSpacing:'-0.02em'}}>Views</div>
                        <div style={{fontSize:'14px',color:'#9ca3af'}}>by Amish B Harsoor</div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'20px',zIndex:1,maxWidth:'1000px',flex:1,justifyContent:'center'}}>
                        <div style={{display:'inline-flex',padding:'8px 20px',backgroundColor:'#1f2937',color:category==='Tech'?'#60a5fa':'#f472b6',borderRadius:'9999px',fontSize:'16px',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.05em'}}>{category}</div>
                        <div style={{fontSize:'52px',fontWeight:'bold',color:'#fff',lineHeight:1.1,letterSpacing:'-0.02em',overflow:'hidden'}}>{title}</div>
                        {excerpt && (<div style={{fontSize:'20px',color:'#9ca3af',lineHeight:1.4,overflow:'hidden'}}>{excerpt}</div>)}
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',zIndex:1,borderTop:'1px solid #374151',paddingTop:'20px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:'12px',color:'#6b7280',fontSize:'16px'}}>
                            <div>{date}</div>
                            <div></div>
                            <div>views.amish.dev</div>
                        </div>
                        <div style={{display:'flex',alignItems:'center',gap:'8px',color:'#6b7280',fontSize:'14px'}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#6b7280">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </div>
                    </div>
                </div>
            ),
            {width:1200,height:675}
        )
    } catch (e: unknown) {
        console.error(e)
        return new Response('Failed to generate Twitter card', { status: 500 })
    }
}
