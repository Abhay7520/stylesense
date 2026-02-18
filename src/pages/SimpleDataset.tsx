const SimpleDataset = () => {
  const generateDataset = () => {
    const dataset = {
      men_outfits: [
        { id: "men_1", category: "Casual", price: 50 },
        { id: "men_2", category: "Business", price: 150 }
      ],
      women_outfits: [
        { id: "women_1", category: "Party", price: 80 },
        { id: "women_2", category: "Casual", price: 120 }
      ]
    }
    
    const dataStr = JSON.stringify(dataset, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', 'fashion_dataset.json')
    linkElement.click()
    
    alert('Dataset downloaded!')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #FFEDC7, #FFA6A6, #FF7070)', padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
          Fashion Dataset Generator
        </h1>
        <p style={{ fontSize: '20px', color: '#666', marginBottom: '40px' }}>
          Create AI training datasets for fashion recommendations
        </p>
        
        <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
            🚀 Generate Dataset
          </h2>
          
          <div style={{ background: '#FFF5F5', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
            <h3 style={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>Dataset Specifications:</h3>
            <ul style={{ color: '#666', fontSize: '14px', listStyle: 'none', padding: 0 }}>
              <li>• Sample men's and women's outfits</li>
              <li>• Category and price data</li>
              <li>• Ready-to-use JSON format</li>
              <li>• Compatible with AI training</li>
            </ul>
          </div>

          <button 
            onClick={generateDataset}
            style={{ 
              width: '100%', 
              padding: '16px', 
              background: 'linear-gradient(to right, #EB4C4C, #FF7070)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '50px', 
              fontSize: '18px', 
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            📊 Generate & Download Dataset
          </button>
        </div>
      </div>
    </div>
  )
}

export default SimpleDataset