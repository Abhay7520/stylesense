import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Sparkles, Users } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Card from '../components/Card'
import { FashionDatasetGenerator } from '../lib/datasetGenerator'

const DatasetManager = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [datasetStats, setDatasetStats] = useState({
    menOutfits: 0,
    womenOutfits: 0,
    totalItems: 0
  })

  const generator = new FashionDatasetGenerator()

  const generateDataset = async () => {
    setIsGenerating(true)
    
    // Simulate dataset generation
    setTimeout(() => {
      const dataset = generator.generateFullDataset(100, 100)
      setDatasetStats({
        menOutfits: dataset.men_outfits.length,
        womenOutfits: dataset.women_outfits.length,
        totalItems: dataset.men_outfits.length + dataset.women_outfits.length
      })
      
      // Export the dataset
      generator.exportDataset(dataset, 'stylesense_fashion_dataset.json')
      
      setIsGenerating(false)
      alert('Dataset generated and downloaded successfully!')
    }, 2000)
  }

  const datasetStructure = {
    menCategories: ['Casual', 'Business', 'Formal', 'Sports', 'Beach', 'Date Night'],
    womenCategories: ['Casual', 'Business', 'Party', 'Dresses', 'Brunch', 'Wedding', 'Beach'],
    attributes: [
      'Body Types: Slim, Athletic, Average, Curvy, Plus Size',
      'Color Palettes: Season-based (Summer, Winter, Spring, Autumn)',
      'Price Ranges: Budget ($30-100), Mid-range ($100-300), Premium ($300+)',
      'Style Tags: Classic, Trendy, Minimalist, Bohemian, Sporty',
      'Occasions: Work, Party, Casual, Formal, Special Events'
    ]
  }

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Fashion Dataset Manager
            </h1>
            <p className="text-xl text-gray-600">
              Create and manage AI training datasets for fashion recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Stats Cards */}
            <Card className="p-6 text-center">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{datasetStats.menOutfits}</h3>
              <p className="text-gray-600">Men's Outfits</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="p-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{datasetStats.womenOutfits}</h3>
              <p className="text-gray-600">Women's Outfits</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{datasetStats.totalItems}</h3>
              <p className="text-gray-600">Total Items</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dataset Generation */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-[#EB4C4C]" />
                Generate Dataset
              </h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-[#FFA6A6]/10 to-[#FFEDC7]/10 rounded-2xl">
                  <h3 className="font-semibold text-gray-800 mb-2">Dataset Specifications:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 100 Men's outfits across 6 categories</li>
                    <li>• 100 Women's outfits across 7 categories</li>
                    <li>• Complete metadata for AI training</li>
                    <li>• Compatible with multiple body types and skin tones</li>
                    <li>• Price ranges and style recommendations</li>
                  </ul>
                </div>

                <button
                  onClick={generateDataset}
                  disabled={isGenerating}
                  className="w-full py-4 bg-gradient-to-r from-[#EB4C4C] to-[#FF7070] text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Database className="w-5 h-5" />
                  <span>{isGenerating ? 'Generating Dataset...' : 'Generate Complete Dataset'}</span>
                </button>

                {isGenerating && (
                  <div className="flex flex-col items-center space-y-2 py-4">
                    <div className="animate-spin w-8 h-8 border-4 border-[#EB4C4C] border-t-transparent rounded-full"></div>
                    <p className="text-sm text-gray-600">Creating AI training data...</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Dataset Structure */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Database className="w-6 h-6 mr-2 text-[#EB4C4C]" />
                Dataset Structure
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Categories:</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-blue-600 mb-2">Men's Categories:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {datasetStructure.menCategories.map((cat) => (
                          <li key={cat}>• {cat}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-pink-600 mb-2">Women's Categories:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {datasetStructure.womenCategories.map((cat) => (
                          <li key={cat}>• {cat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">AI Training Attributes:</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {datasetStructure.attributes.map((attr, index) => (
                      <li key={index} className="p-2 bg-gray-50 rounded-lg">{attr}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Data Sources Guide */}
          <Card className="p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Real Dataset Sources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Free Sources</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <strong>Kaggle:</strong> Fashion MNIST, DeepFashion</li>
                  <li>• <strong>Unsplash API:</strong> High-quality fashion photos</li>
                  <li>• <strong>Pexels API:</strong> Free stock fashion images</li>
                  <li>• <strong>Open Source:</strong> Polyvore, iMaterialist</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Paid Sources</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <strong>Shutterstock:</strong> Professional fashion</li>
                  <li>• <strong>Getty Images:</strong> High-end catalogs</li>
                  <li>• <strong>Fashion Stock:</strong> Specialized datasets</li>
                  <li>• <strong>Adobe Stock:</strong> Premium fashion photos</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Collection Tips</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Ensure diverse representation</li>
                  <li>• Include multiple angles</li>
                  <li>• Get model consent</li>
                  <li>• Maintain consistent quality</li>
                  <li>• Label accurately</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default DatasetManager