import "./ProviderPortfolio.css"

export default function ProviderPortfolio({ images }){
    return(
        <> 
            <h1>Portfolio</h1>
            <div className="portfolio">
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Portfolio ${index}`} />
                ))}
            </div>
        </>
        
    )
}