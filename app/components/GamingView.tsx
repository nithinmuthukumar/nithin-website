import { forwardRef } from "react";

const CardsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

interface GamingViewProps {
  isVisible: boolean;
}

const GamingView = forwardRef<HTMLDivElement, GamingViewProps>(
  ({ isVisible }, ref) => {
    return (
      <div 
        ref={ref}
        className={`absolute top-0 left-0 right-0 flex flex-col items-center justify-start text-center space-y-8 pb-12 ${
          isVisible ? 'slide-in-right' : 'slide-out-right'
        }`}
      >
      {/* Gaming Tagline */}
      <p className="text-2xl md:text-3xl text-base-content/70 font-medium transition-colors duration-[400ms]">
        Magic: The Gathering & More
      </p>
      
      {/* About Me Section */}
      <div className="max-w-3xl mx-auto px-4">
        {/* Separator */}
        <div className="w-24 h-0.5 bg-base-content/30 mx-auto mb-8 transition-colors duration-[400ms]"></div>
        <p className="text-base md:text-lg text-base-content/80 leading-relaxed transition-colors duration-[400ms]">
          I'm a passionate Magic the Gathering player who mostly plays standard. I enjoy playing combo-control archetypes and love brewing decks that kill in one turn.
        </p>
      </div>
      
      {/* Currently Playing Section */}
      <div className="card bg-base-200 shadow-xl mt-8 max-w-2xl mx-auto transition-all duration-[400ms] border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center mb-4 transition-colors duration-[400ms]">
            <CardsIcon />
            What I'm Currently Playing
          </h2>
          <p className="text-base-content/70 transition-colors duration-[400ms]">
            Check out what decks I'm currently playing
          </p>
        </div>
      </div>
    </div>
    );
  }
);

GamingView.displayName = "GamingView";

export default GamingView;

