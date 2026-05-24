import './card.css'

export default function Card(props){
    console.log(props)
    return(
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-80 hover:scale-105 transition-transform duration-300 cursor-pointer ">
  <img
    src={props.url}
    alt="laptop"
    className="w-full h-52 object-cover"
  />

  <div className="p-5">
    <h1 className="text-2xl font-bold text-gray-800 mb-2">
      {props.name}
    </h1>

    <p className="text-gray-600 text-sm mb-4">
      {props.description}
    </p>

    <p className="text-3xl font-extrabold text-blue-600 mb-5">
      ${props.price}
    </p>

    <div className="flex gap-3">
      <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold transition">
        Add to Cart
      </button>

      <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold transition">
        Buy Now
      </button>
    </div>
  </div>
</div>
    )
}