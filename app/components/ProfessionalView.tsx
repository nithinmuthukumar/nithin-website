import { forwardRef } from "react";

interface ProfessionalViewProps {
  isVisible: boolean;
}

const ProfessionalView = forwardRef<HTMLDivElement, ProfessionalViewProps>(
  ({ isVisible }, ref) => {
    return (
      <div 
        ref={ref}
        className={`absolute top-0 left-0 right-0 flex flex-col items-center justify-start text-center space-y-8 pb-12 ${
          isVisible ? 'slide-in-left' : 'slide-out-left'
        }`}
      >
      {/* About Me Section */}
      <div className="max-w-3xl mx-auto px-4">
        {/* Separator */}
        <div className="w-24 h-0.5 bg-base-content/30 mx-auto mb-8 transition-colors duration-[400ms]"></div>
        <p className="text-base md:text-lg text-base-content/80 leading-relaxed transition-colors duration-[400ms]">
          I'm a full-stack developer who loves taking ideas from concept to a polished, dependable product. I've participated in over 40+ <a href="https://devpost.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover underline transition-colors duration-200">hackathons</a> and <a href="https://itch.io" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover underline transition-colors duration-200">game jams</a>, which sparked my passion for rapid prototyping and experimenting with new approaches. I enjoy working across the stack and focusing on building software that's fast, reliable, and thoughtfully crafted.
        </p>
      </div>

      {/* Currently Working On Section */}
      <div className="card bg-base-200 shadow-xl mt-8 max-w-2xl mx-auto transition-all duration-[400ms] border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-xl justify-center mb-4 transition-colors duration-[400ms]">
            I'm currently working on
          </h2>
          <ul className="list-disc list-inside space-y-2 text-base-content/70 transition-colors duration-[400ms]">
            <li>Building innovative web applications</li>
            <li>Exploring new technologies</li>
          </ul>
        </div>
      </div>
    </div>
    );
  }
);

ProfessionalView.displayName = "ProfessionalView";

export default ProfessionalView;

