const IngredientInput = ({ 
  ingredient, 
  index, 
  onChange, 
  onRemove, 
  showRemoveButton,
  placeholder = `Ingredient ${index + 1}`
}) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        value={ingredient}
        onChange={(e) => onChange(index, e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      {showRemoveButton && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="ml-2 text-red-500 hover:text-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default IngredientInput