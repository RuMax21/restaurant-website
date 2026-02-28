import { Link } from 'react-router-dom';
import type { SocialLinkProps } from '../../model';

export default function SocialLinks({ links }: SocialLinkProps) {
  return (
    <div>
      <h2>Follow us</h2>
      <ul>
        {links.map(link => (
          <li key={link.id}>
            <Link to={link.href}>
              // TODO: rewrite from text to icon
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
