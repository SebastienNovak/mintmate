import MarketplaceLanding from '../../components/EconomicAndNFT/MarketplaceLanding/MarketplaceLanding';
import NFTGallery from '../../components/EconomicAndNFT/NFTGallery/NFTGallery';
import Wallet from '../../components/EconomicAndNFT/Wallet/Wallet';

const MarketplacePage = () => {
    return (
        <div>
        <MarketplaceLanding />
        <NFTGallery />
        <Wallet />
        {/* Other components related to the marketplace */}
        </div>
    );
};

export default MarketplacePage;
