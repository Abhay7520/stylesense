import { useState } from 'react'

const DatasetWorking = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [datasetStats, setDatasetStats] = useState({
    menOutfits: 0,
    womenOutfits: 0,
    totalItems: 0
  })

  const generateDataset = async () => {
    setIsGenerating(true)
    
    // Simulate dataset generation
    setTimeout(() => {
      const dataset = {
        men_outfits: Array.from({ length: 100 }, (_, i) => ({
          id: `men_${i + 1}`,
          category: ['Casual', 'Business', 'Formal'][i % 3],
          price: Math.floor(Math.random() * 200) + 50
        })),
        women_outfits: Array.from({ length: 100 }, (_, i) => ({
          id: `women_${i + 1}`,
          category: ['Casual', 'Party', 'Business'][i % 3],
          price: Math.floor(Math.random() * 250) + 80
        }))
      }
      
      setDatasetStats({
        menOutfits: dataset.men_outfits.length,
        womenOutfits: dataset.women_outfits.length,
        totalItems: dataset.men_outfits.length + dataset.women_outfits.length
      })
      
      // Download dataset
      const dataStr = JSON.stringify(dataset, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      const exportFileDefaultName = 'fashion_dataset.json'
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
      
      setIsGenerating(false)
      alert('Dataset generated and downloaded successfully!')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFEDC7] via-[#FFA6A6] to-[#FF7070] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Fashion Dataset Generator
          </h1>
          <p className="text-xl text-gray-600">
            Create AI training datasets for fashion recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Stats Cards */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 text-center">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">M</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{datasetStats.menOutfits}</h3>
            <p className="text-gray-600">Men's Outfits</p>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 text-center">
            <div className="p-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">W</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{datasetStats.womenOutfits}</h3>
            <p className="text-gray-600">Women's Outfits</p>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 text-center">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">T</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{datasetStats.totalItems}</h3>
            <p className="text-gray-600">Total Items</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dataset Generation */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              ✨ Generate Dataset
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-[#FFA6A6]/10 to-[#FFEDC7]/10 rounded-2xl">
                <h3 className="font-semibold text-gray-800 mb-2">Dataset Specifications:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 100 Men's outfits across 3 categories</li>
                  <li>• 100 Women's outfits across 3 categories</li>
                  <li>• Complete metadata for AI training</li>
                  <li>• Price ranges and category data</li>
                  <li>• Ready-to-use JSON format</li>
                </ul>
              </div>

              <button
                onClick={generateDataset}
                disabled={isGenerating}
                className="w-full py-4 bg-gradient-to-r from-[#EB4C4C] to-[#FF7070] text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating Dataset...' : '🚀 Generate Complete Dataset'}
              </button>

              {isGenerating && (
                <div className="flex flex-col items-center space-y-2 py-4">
                  <div className="animate-spin w-8 h-8 border-4 border-[#EB4C4C] border-t-transparent rounded-full"></div>
                  <p className="text-sm text-gray-600">Creating AI training data...</p>
                </div>
              )}
            </div>
          </div>

          {/* Dataset Structure */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              📊 Dataset Structure
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Categories:</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-2">Men's Categories:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Casual</li>
                      <li>• Business</li>
                      <li>• Formal</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-pink-600 mb-2">Women's Categories:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Casual</li>
                      <li>• Party</li>
                      <li>• Business</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">AI Training Attributes:</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="p-2 bg-gray-50 rounded-lg">Body Types: Slim, Athletic, Average, Curvy</li>
                  <li className="p-2 bg-gray-50 rounded-lg">Color Palettes: Season-based colors</li>
                  <li className="p-2 bg-gray-50 rounded-lg">Price Ranges: Budget to Premium</li>
                  <li className="p-2 bg-gray-50 rounded-lg">Style Tags: Classic, Trendy, Modern</li>
                  <li className="p-2 bg-gray-50 rounded-lg">Occasions: Work, Party, Casual</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📖 How to Use This Dataset
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">🔧 Step 1: Generate</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Click the generate button</li>
                <li>• Wait for processing</li>
                <li>• Download JSON file</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">🎯 Step 2: Customize</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Add real image URLs</li>
                <li>• Update categories</li>
                <li>• Add more attributes</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">🤖 Step 3: Train AI</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Feed to ML model</li>
                <li>• Train recommendations</li>
                <li>• Deploy to app</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatasetWorking