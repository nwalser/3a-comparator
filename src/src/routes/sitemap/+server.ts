import 'xml';
import xml from 'xml';
import Posts from 'src/data/Posts.json';
import { plainToInstance } from 'class-transformer';
import { Post } from 'src/model/Posts';

import {PortfolioBlueprints} from 'src/model/PortfolioBlueprintStore.js'

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

  PortfolioBlueprints.forEach(blueprint => {
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
