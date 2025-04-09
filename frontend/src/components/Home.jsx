import React, { useEffect, useState } from 'react'; // ✅ added useState
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {
  const [courses, setCourses] = useState([]); // ✅ define state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  // token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };
  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        console.log(response.data.courses);
        setCourses(response.data.courses); // ✅ now it works
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        },
      },
    ],
  };
  return (
    <div className="bg-gradient-to-r from-black to-blue-950">
      <div className="h-[1250px] md:h-[1050px] text-white container mx-auto px-40">

        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="flex item-center space-x-2">
            <img src="/logo.webp" alt="logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl text-orange-500 font-bold">CourseHeaven</h1>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Main Content */}
        <section className="text-center py-20">
          <h1 className="text-4xl font-semibold text-orange-500">CourseHaven</h1>
          <br />
          <p className='text-gray-500'>Sharpen your skills with courses crafted by experts.</p>
          <div className="space-x-4 mt-8">
            <Link to={"/courses"} className="bg-green-500 text-white py-3 px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black">Explore courses</Link>
            <Link to={"https://www.youtube.com/learncoding"} className="bg-white text-black py-3 px-6 rounded font-semibold hover:bg-green-500 duration-300 hover:text-white">
  Courses videos
</Link>

          </div>
        </section>

        {/* Section to list courses (optional preview) */}
        <section>
        <Slider {...settings}>
        {courses.map((course) => (
              <div key={course._id} className="p-4">
                <div className="relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      className="h-32 w-full object-contain"
                      src={course.image?.url}
                      alt=""
                    />
                    <div className="p-6 text-center">
                      <h2 className="text-xl font-bold text-white">
                        {course.title}
                      </h2>
                      <br></br>
                      <Link  to={`/buy/${course._id}`} className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 duration-300">
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
      
        </section>

        <hr />

        {/* Footer */}
        <footer className="my-8">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-start md:items-start">
              <div className="flex items-center space-x-2">
                <img src="/logo.webp" alt="logo" className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl text-orange-500 font-bold">CourseHaven</h1>
              </div>
              <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2">Follow us</p>
                <div className="flex space-x-4">
                  <a href=""><FaFacebook className="text-2xl hover:text-blue-400 duration-300" /></a>
                  <a href=""><FaInstagram className="text-2xl hover:text-pink-600 duration-300" /></a>
                  <a href=""><FaTwitter className="text-2xl hover:text-blue-600 duration-300" /></a>
                </div>
              </div>
            </div>

            <div className="items-center flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Connects</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">YouTube - learn coding</li>
                <li className="hover:text-white cursor-pointer duration-300">Telegram - learn coding</li>
                <li className="hover:text-white cursor-pointer duration-300">GitHub - learn coding</li>
              </ul>
            </div>

            <div className="items-center flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Copyrights © 2024</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">Terms & Conditions</li>
                <li className="hover:text-white cursor-pointer duration-300">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer duration-300">Refund & Cancellation</li>
              </ul>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default Home;
