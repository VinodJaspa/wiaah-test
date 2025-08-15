import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick.scss"
export default function HeroBanner() {
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1519677100203-a0e668c92439",
      title: "Grab Up to 50% Off on selected Headphone",
      btn: "Buy now",
    },
    {
      img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
      title: "Premium Audio Gear for Less",
      btn: "Shop now",
    },
    {
      img: "https://images.unsplash.com/photo-1516387938699-a93567ec168e",
      title: "Experience Sound Like Never Before",
      btn: "Explore",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    
  
  };
  

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-[300px] object-cover md:h-[250px]"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center px-6 md:px-10">
              <div className="max-w-md text-white">
                <h2 className="text-xl md:text-3xl font-bold">{slide.title}</h2>
                <button className="mt-4 bg-[#20ECA7] text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-500 transition">
                  {slide.btn}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
