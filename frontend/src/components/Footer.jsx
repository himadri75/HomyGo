import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">HomyGo</h2>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Discover authentic India through local homestays, cultural experiences, and smart travel planning.
            </p>

            {/* Social Icons (moved here) */}
            <div className="flex gap-4">
              <div className="p-2 border border-blue-700 hover:bg-blue-800 transition cursor-pointer">
                <FaFacebookF />
              </div>
              <div className="p-2 border border-blue-700 hover:bg-blue-800 transition cursor-pointer">
                <FaInstagram />
              </div>
              <div className="p-2 border border-blue-700 hover:bg-blue-800 transition cursor-pointer">
                <FaTwitter />
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-blue-100">Explore</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li className="hover:text-white cursor-pointer">Features</li>
              <li className="hover:text-white cursor-pointer">Destinations</li>
              <li className="hover:text-white cursor-pointer">Experiences</li>
              <li className="hover:text-white cursor-pointer">Reviews</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-blue-100">Company</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Team (replaced Connect) */}
          <div>
            <h3 className="font-semibold mb-4 text-blue-100">Team</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <a
                  href="https://www.linkedin.com/in/himadri516/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Himadri Karan ↗
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/sourik-das/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Sourik Das ↗
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/anish-kar-b6764b259/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Anish Kar ↗
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/arka-roy-76b1561b2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Arka Boy ↗
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/arpansantra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Arpan Santra ↗
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-blue-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-blue-300">

          <p>© {new Date().getFullYear()} HomyGo. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Support</span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;