import "./ProviderPortfolio.css"
import { useState } from 'react';


export default function ProviderPortfolio({ images }){

    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = 12;
    const [isModalOpen, setIsModalOpen] = useState(false); // tracks modal state
    const [selectedImage, setSelectedImage] = useState(null); // tracks selected image

    // calculates indexes of the first and last image for the current page
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

    // calculates pages
    const totalPages = Math.ceil(images.length / imagesPerPage);
    // Function to change the page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // opens modal with the selected image
    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    return(
        <div className="portfolio"> 
            <h2>Portfolio</h2>
            <div className="portfolio-container">
                {currentImages.map((image, index) => (
                    <div className="portfolio-item" key={index}>
                        <img src={image} alt={`Portfolio ${index}`} onClick={() => openModal(image)}/>
                    </div>
                ))}
            </div>
            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="Selected" />
                        <button className="close-modal" onClick={closeModal}>X</button>
                    </div>
                </div>
            )}
            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={currentPage === number ? "active" : ""}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
        
    )
}