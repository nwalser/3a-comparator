import 'xml';
import xml from 'xml';
import PortfolioBlueprints from 'src/data/PortfolioBlueprints.json';
import Posts from 'src/data/Posts.json';
import { PortfolioBlueprint } from 'src/model/PortfolioBuilder';
import { plainToInstance } from 'class-transformer';
import { Post } from 'src/model/Posts';

const baseUrl = "https://www.3a-rechner.ch";

type Page = {
  loc: string,
  updated: string | undefined
}


/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
  let portfolioPages = getPortfolioPages();
  let postPages = getPostPages();
  let otherPages = getOtherPages();

  let sitemap = generateSitemap(portfolioPages.concat(postPages).concat(otherPages));

  return new Response(String(sitemap));
}

function getOtherPages() : Page[] {
  let pages:Page[] = [
    {
      loc: baseUrl,
      updated: ""
    }
  ]

  return pages;
}

function getPortfolioPages(): Page[] {
  let pages: Page[] = [];

  let portfolioBlueprints = plainToInstance(PortfolioBlueprint, PortfolioBlueprints)

  portfolioBlueprints.forEach(blueprint => {
    let page: Page = {
      loc: baseUrl + "/rechner/" + blueprint.providerAbbreviation + "/" + blueprint.id,
      updated: undefined,
    }

    pages.push(page);
  });

  return pages;
}

function getPostPages(): Page[] {
  let pages: Page[] = [];

  let posts = plainToInstance(Post, Posts);

  posts.forEach(post => {
    let page: Page = {
      loc: baseUrl + post.link,
      updated: post.updated
    }

    pages.push(page);
  });

  return pages;
}

function generateSitemap(pages: Page[]): string {
  let sitemap: string = "";

  sitemap += '<?xml version="1.0" encoding="UTF-8"?> \n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> \n';

  pages.forEach(page => {
    sitemap += '  <url> \n';
    sitemap += '    ' + xml(page) + "\n";
    sitemap += '  </url> \n';
  })

  sitemap += '</urlset> \n';

  return sitemap;
}
