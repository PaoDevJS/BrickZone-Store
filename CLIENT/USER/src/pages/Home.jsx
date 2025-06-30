import "../styles/Home.css"
import Banner from "../components/Banner"

const Home = () => {
  return (
    <div className="w-full h-full my-10 px-10 bg-Gray-Light/30">
      <div className="container m-auto">
        <Banner />
      </div>
    </div>
  )
}

export default Home