import "./ProviderInfo.css"

export default function ProviderInfo({ firstName, lastName, specialization, location, bio, verified, profileImage }){
    return(
        <> 
            <h1>{firstName} {lastName} {verified && <span className="verified">Verified</span>}</h1>
            <div >
                <p>{specialization}</p>
                <p>{location}</p>
                <p>{bio}</p>
                <img src={profileImage}/>
                
            </div>

        </>
        
    )
}