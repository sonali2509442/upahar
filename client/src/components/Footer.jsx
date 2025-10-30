const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", url: "#" },
        { text: "Best Sellers", url: "#" },
        { text: "Offers & Deals", url: "#" },
        { text: "Contact Us", url: "#" },
        { text: "FAQs", url: "#" }
      ]
    },
    {
      title: "Need Help?",
      links: [
        { text: "Delivery Information", url: "#" },
        { text: "Return & Refund Policy", url: "#" },
        { text: "Payment Methods", url: "#" },
        { text: "Track your Order", url: "#" },
        { text: "Contact Us", url: "#" }
      ]
    },
    {
      title: "Follow Us",
      links: [
        { text: "Instagram", url: "#" },
        { text: "Twitter", url: "#" },
        { text: "Facebook", url: "#" },
        { text: "YouTube", url: "#" }
      ]
    }
  ];

  return (
    <footer className="w-full px-6 md:px-10 lg:px-20 xl:px-32 mt-24 bg-primary/10">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-300/40 text-gray-600">
        
        {/* Logo + About */}
        <div className="md:w-[45%]">
          {/* ✅ Use /images/logo.png instead of \public\images\logo.png */}
          <img className="w-32 md:w-40" src="/images/logo.png" alt="Upahar Logo" />
          <p className="max-w-md mt-6 text-sm md:text-base leading-relaxed">
            We are your one-stop destination for thoughtful gifts, beautiful flowers, 
            delicious cakes, and personalized surprises. Whether it’s a birthday, anniversary, 
            festival, or “just because,” we help you make every moment special — 
            delivered with love, care, and on time.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-6">
          {linkSections.map((section, index) => (
            <div key={index} className="min-w-[120px]">
              <h3 className="font-semibold text-base text-gray-900 mb-3 md:mb-5">{section.title}</h3>
              <ul className="text-sm space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="hover:underline hover:text-primary transition">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <p className="py-4 text-center text-xs md:text-sm text-gray-500">
        © {new Date().getFullYear()} Upahar. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
