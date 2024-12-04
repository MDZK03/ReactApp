'use client'
import { AppBar, Container, Toolbar } from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useHasMounted } from './utils/customHook';

export default function AppFooter() {
    const hasMounted = useHasMounted();
    if (!hasMounted) {
        return (<></>)
    } else {
        return (
            <div>
                <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: "#f2f2f2" }}>
                    <Toolbar>
                        <Container sx={{ display: "flex", gap: 10 }}>
                            <AudioPlayer
                                volume={0.1}
                                autoPlay
                                style={{
                                    boxShadow: "unset",
                                    backgroundColor: "unset"
                                }}
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
                                onPlay={e => console.log("onPlay")}
                            />
                            <div style={{
                                display: "flex", flexDirection: "column", alignItems: "center",
                                justifyContent: "start", minWidth: 100
                            }}>
                                <div style={{ color: "black" }}>Song title</div>
                                <div style={{ color: "#9a9a9a" }}>Artist title</div>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}