import json
import datetime
from scholarly import scholarly

SCHOLAR_ID = 'vMLmnA0AAAAJ'

def fetch_publications():
    print(f"Fetching profile for Google Scholar ID: {SCHOLAR_ID}")
    try:
        author = scholarly.search_author_id(SCHOLAR_ID)
        print("Filling author profile details... this may take a moment.")
        author = scholarly.fill(author, sections=['publications'])
        
        publications_data = []
        
        for pub in author.get('publications', []):
            try:
                # We fill each publication to get the author list, complete journal name, and URL
                pub_filled = scholarly.fill(pub)
                bib = pub_filled.get('bib', {})
                
                title = bib.get('title', '')
                authors = bib.get('author', '')
                pub_year = bib.get('pub_year', '')
                journal = bib.get('citation', '') or bib.get('journal', '')
                pub_url = pub_filled.get('pub_url', '')
                
                pub_info = {
                    'title': title,
                    'authors': authors,
                    'year': pub_year,
                    'journal': journal,
                    'url': pub_url,
                    'id': pub_filled.get('author_pub_id', '')
                }
                publications_data.append(pub_info)
                print(f"Fetched: {title} ({pub_year})")
            except Exception as inner_e:
                print(f"Skipping a publication due to error: {inner_e}")
        
        output_file = 'publications.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump({
                'last_updated': datetime.datetime.now().isoformat(),
                'publications': publications_data
            }, f, indent=4)
        
        print(f"Successfully saved {len(publications_data)} publications to {output_file}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    fetch_publications()
