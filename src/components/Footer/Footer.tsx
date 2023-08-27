import { faEnvelope, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
	return (
		<div className="bg-orange-300 w-full py-4 pb-3 relative z-10">
			<div className="flex justify-around px-8 pb-4">
				<div>
					<h2 className="text-white font-bold text-xl mb-4">Contact</h2>
					<ul className="space-y-2 font-medium">
						<li>
							<FontAwesomeIcon icon={faPhone} className="text-white mr-2" />
							<a href="tel:+123456789" className="text-white hover:text-gray-200">
								Phone: +123456789
							</a>
						</li>
						<li>
							<FontAwesomeIcon icon={faEnvelope} className="text-white mr-2" />
							<a href="mailto:info@example.com" className="text-white hover:text-gray-200">
								Email: info@example.com
							</a>
						</li>
						<li>
							<FontAwesomeIcon icon={faGlobe} className="text-white mr-2" />
							<a
								href="https://example.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:text-gray-200">
								Website: example.com
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h2 className="text-white font-bold text-xl mb-4">Social Media</h2>
					<ul className="space-y-2 ">
						<li>
							<FontAwesomeIcon icon={faFacebook} className="text-white mr-2" />
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:text-gray-200">
								Facebook
							</a>
						</li>
						<li>
							<FontAwesomeIcon icon={faTwitter} className="text-white mr-2" />
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:text-gray-200">
								Twitter
							</a>
						</li>
						<li>
							<FontAwesomeIcon icon={faInstagram} className="text-white mr-2" />
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:text-gray-200">
								Instagram
							</a>
						</li>
					</ul>
				</div>
			</div>
			<p className="text-center text-white pt-3 font-medium border-t border-slate-500 border-opacity-25">
				Veselin Yordanov &copy; 2023
			</p>
		</div>
	);
};

export default Footer;
