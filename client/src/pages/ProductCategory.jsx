import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard'; // Adjust path as needed



const Allcategories = [
    
    {
        text: "Flowers",
        path: "flowers",
        image: ["https://assets.intleflorist.com/site/0081A/PIM_Images/Regular/BBDLU1-1.png"],
        bgcolor: "#FFAAAA"
    },
   
    {
        text: "Cakes",
        path: "cakes",
        image: ["https://thebrowniestudio.com/cdn/shop/files/GiftHamper2.jpg?v=1689936622"],
        bgcolor: "#71C0BB"
    },
     {
        text: "Chocolates",
        path: "chocolates",
        image: ["https://hattys.co.uk/wp-content/uploads/2024/06/Chocolate-Gift-Bag.jpg"],
        bgcolor: "#D29F80"
    },
    {
        text: "Personalized Gifts",
        path: "gifts",
        image: ["https://zocivoci.com/wp-content/uploads/2025/01/r4-500x500.webp"],
        bgcolor: "#FFC785"
    },
    {
        text: "Greeting Cards",
        path: "cards",
        image: ["https://i.etsystatic.com/5494423/r/il/827388/1740225175/il_fullxfull.1740225175_7zhz.jpg"],
        bgcolor: "#E69DB8"
    },
    {
        text: "Gift Hampers",
        path: "hampers",
        image: ["https://thegifttree.in/wp-content/uploads/2022/08/TGT450-.webp"],
        bgcolor: "#F8B55F"
    },
    {
        text: "Plants",
        path: "plants",
        image:["https://nurserylive.com/cdn/shop/products/nurserylive-gifts-symbol-of-endless-love-red-anthurium-gift-plant-16968608022668_512x512.jpg?v=1634229596"],
        bgcolor: "#DDEB9D"
    },


    {
        text: "Soft Toys",
        path: "softoy",
        image:["https://i.etsystatic.com/22203425/r/il/bd579c/3579392552/il_fullxfull.3579392552_8lai.jpg"],
        bgcolor: "#A9B5DF"
    }
]




const ProductCategory = () => {
    const {product} = useAppContext ();
    const {category} = useParams();
    const searchCategory = Allcategories.find((item) => item.path.toLowerCase() === category);

    const filteredProducts =product.filter((products)=>products.category.trim().toLowerCase()=== category);
  return (
    <div className='mt-16'>
  {searchCategory && (
    <div className='flex flex-col items-end w-max'>
      <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
      <div className='w-16 h-0.5 bg-primary rounded-full'></div>
    </div>
  )}
  {filteredProducts.length > 0 ? (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
{filteredProducts.map((product) => (
  <ProductCard key={product._id || product.id} product={product} />
))}
    </div>
  ): (
    <div className='flex items-center justify-center h-[60vh]'>
      <p className='text-2xl font-medium text-primary'>No products found in this category.</p>
    </div>
  )} 
    </div>
  )
}


export default ProductCategory