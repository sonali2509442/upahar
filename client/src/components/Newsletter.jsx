const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 mt-20 pb-14 px-4">
      <h1 className="text-2xl md:text-4xl font-semibold">Never Miss a Deal!</h1>
      <p className="text-sm md:text-lg text-gray-500/70 max-w-xl">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </p>

      <form className="flex w-full max-w-xl">
        <input
          className="flex-1 border border-gray-300 rounded-l-md px-3 text-sm md:text-base outline-none"
          type="email"
          placeholder="Enter your email address"
          required
        />
        <button
          type="submit"
          className="px-6 md:px-10 text-sm md:text-base text-white bg-primary hover:bg-primary-dull transition-all rounded-r-md"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default Newsletter;
