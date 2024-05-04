import {Link} from "@inertiajs/react";

export default function Pagination({links})
{
    return (
      <nav className="text-center mt-4">
          {links && links.length ? (
              links.map(link => (
                  <Link
                      preserveScroll
                      href={link.url}
                      key={link.label}
                      className={"inline-block py-2 px-3 rounded-lg text-gray-300 text-xs "
                          + (link.active ? 'text-gray-950 ':' ')
                          + (!link.url? '!text-gray-500 cursor-not-allowed ':'hover:text-gray-950 ')
                  }
                      dangerouslySetInnerHTML={{__html: link.label}}></Link>
              ))
          ) : ''}
      </nav>
    );
}
