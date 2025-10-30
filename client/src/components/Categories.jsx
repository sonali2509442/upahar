import React from 'react'
import { useAppContext } from '../context/AppContext'

const Allcategories = [
  {
    text: "Flowers",
    path: "flowers",
    image: "https://assets.intleflorist.com/site/0081A/PIM_Images/Regular/BBDLU1-1.png",
    bgcolor: "#FFAAAA"
  },
  {
    text: "Cakes",
    path: "cakes",
    image: "https://thebrowniestudio.com/cdn/shop/files/GiftHamper2.jpg?v=1689936622",
    bgcolor: "#71C0BB"
  },
  {
    text: "Chocolates",
    path: "chocolates",
    image: "https://hattys.co.uk/wp-content/uploads/2024/06/Chocolate-Gift-Bag.jpg",
    bgcolor: "#D29F80"
  },
  {
    text: "Personalized Gifts",
    path: "gifts",
    image: "https://zocivoci.com/wp-content/uploads/2025/01/r4-500x500.webp",
    bgcolor: "#FFC785"
  },
  {
    text: "Greeting Cards",
    path: "cards",
    image: "https://i.etsystatic.com/5494423/r/il/827388/1740225175/il_fullxfull.1740225175_7zhz.jpg",
    bgcolor: "#E69DB8"
  },
  {
    text: "Gift Hampers",
    path: "hampers",
    image: "https://thegifttree.in/wp-content/uploads/2022/08/TGT450-.webp",
    bgcolor: "#F8B55F"
  },
  {
    text: "Plants",
    path: "plants",
    image: "https://nurserylive.com/cdn/shop/products/nurserylive-gifts-symbol-of-endless-love-red-anthurium-gift-plant-16968608022668_512x512.jpg?v=1634229596",
    bgcolor: "#DDEB9D"
  },
  {
    text: "Soft Toys",
    path: "softoy",
    image: "https://i.etsystatic.com/22203425/r/il/bd579c/3579392552/il_fullxfull.3579392552_8lai.jpg",
    bgcolor: "#A9B5DF"
  }
]

const Categories = () => {
  const { navigate } = useAppContext()

  return (
    <div className="mt-12">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>

      {/* Horizontal scroll row */}
      <div className="flex gap-4 mt-6 overflow-x-auto scrollbar-hide">
        {Allcategories.map((item, index) => (
          <div
            key={index}
            className="group cursor-pointer rounded-lg flex-shrink-0 flex flex-col justify-center items-center 
                       p-3 h-32 sm:h-36 md:h-40 w-32 sm:w-36 md:w-40"
            style={{ backgroundColor: item.bgcolor }}
            onClick={() => {
              navigate(`/products/${item.path.toLowerCase()}`);
              scrollTo(0, 0)
            }}
          >
            <img
              src={item.image}
              alt={item.text}
              className="group-hover:scale-110 transition w-16 sm:w-20 md:w-24 object-contain"
            />
            <p className="mt-2 text-xs sm:text-sm font-medium text-center">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories


