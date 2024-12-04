import { Container } from '@mui/material/';
import MainSlider from "@/components/main/mainSlider";
import { sendRequest } from '@/components/utils/api';

export default async function HomePage() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${url}api/v1/tracks/top`,
    method: "POST",
    body: { category: "CHILL", limit: 10 }
  })

  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${url}api/v1/tracks/top`,
    method: "POST",
    body: { category: "WORKOUT", limit: 10 }
  })

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${url}api/v1/tracks/top`,
    method: "POST",
    body: { category: "PARTY", limit: 10 }
  })

  return (
    <Container>
      <MainSlider title="Top Chill Songs" data={chills?.data ?? []} />
      <MainSlider title="Top Work Out Songs" data={workouts?.data ?? []} />
      <MainSlider title="Top Party Songs" data={party?.data ?? []} />
    </Container>
  );
}
