import ArtistPortfolio from '../../components/UserAndArtist/ArtistPortfolio/ArtistPortfolio';
import ArtistBlog from '../../components/UserAndArtist/ArtistBlog/ArtistBlog';

const ArtistProfilePage = () => {
    return (
        <div>
        <ArtistPortfolio artistId={''} />
        <ArtistBlog artistId={''} />
        {/* Additional components related to the artist profile */}
        </div>
    );
};

export default ArtistProfilePage;
