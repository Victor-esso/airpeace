
import Holdup from "../components/Holdup"
import BgSky from "../assets/sky.png"

const Advantage = () => {

  return (
    <div className="w-full h-[100dvh] flex-center  bg-rose-600 relative" style={{ backgroundImage: `url(${BgSky})` }}>
      <Holdup />
    </div>
  )
}

export default Advantage