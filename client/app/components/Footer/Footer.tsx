import Link from "next/link"

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer>
  <div className="border border-[#ffffff1e] dark:border-[#ffffff1e]" />
  <br />
  <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
      <div className="space-y-3">
        <h3 className="text-[20px] font-[600] text-black dark:text-white">About</h3>
        <ul className="space-y-4">
          <li>
            <Link
              className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
              href="/about"
            >
              Our Story
            </Link>
          </li>
          <li>
            <Link
              className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2" href="/faq">
              FAQ
            </Link>
          </li>
        </ul>
      </div>
      <div className="space-y-3">
        <h3 className="text-[20px] font-[600] text-black dark:text-white">Quick Links</h3>
        <ul className="space-y-4">
          <li>
            <Link
              className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
              href="/courses"
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
              href="/profile"
            >
              My Account
            </Link>
          </li>
          <li>
            <Link
              className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
              href="/course-dashboard"
            >
              Course Dashboard
            </Link>
          </li>
        </ul>
      </div>
      <div className="space-y-3">
        <h3 className="text-[20px] font-[600] text-black dark:text-white">Social Links</h3>
        <ul className="space-y-4">
          <li>
            <Link
              className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
              href="https://www.youtube.com/#"
            >
              Youtube
            </Link>
          </li>
          <li>
            <Link
              className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
              href="https://www.instagram.com/im_abdulmannan/"
            >
              Instagram
            </Link>
          </li>
          <li>
            <Link
              className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
              href="https://www.github.com/im-abdulmannan"
            >
              github
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-[20px] font-[600] text-black dark:text-white">Newsletter</h3>
        <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
          Stay up-to-date with everything related to our brand and gain
          invaluable insights for your programming journey by subscribing to our
          newsletter.
        </p>
        <form className="mt-2">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            autoComplete="email"
            required
            placeholder="Enter your email"
            className="w-full bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
            type="email"
            defaultValue=""
            name="email-address"
          />
          <button
            type="submit"
            className="flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-[33%] text-[16px] font-Poppins font-semibold 800px:!w-[150px] mt-5"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
    <br />
    <p className="text-center text-black dark:text-white">
      Copyright &copy; 2023 ELearning | All Rights Reserved
    </p>
  </div>
  <br />
</footer>

  )
}

export default Footer