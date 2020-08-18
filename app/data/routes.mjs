const routes = {
  base: {
    nav: ['portal', 'forum', 'news', 'wiki', 'terms', 'contact'],
    nav_sb: ['portal', 'forum', 'news', 'wiki','terms', 'contact'],
  },
  profile: {
    items_a: {
      name: 'Name',
      email: 'Email',
      url: 'URL',
      created_at: 'Created',
      updated_at: 'Updated',
      disk_usage: 'Disk usage',
      hireable: 'Hireable'
    },
    items_b: {
      company: 'Company',
      total_private_repos: 'Private repos',
      public_repos: 'Public repos',
      private_gists: 'Private gists',
      public_gists: 'Public gists',
      followers: 'Followers',
      following: 'Following'
    }
  },
  login: {
    msg: 'login page data here...'
  },
  forum: {
    msg: 'forum page data here...'
  },
  news: {
    msg: 'news page data here..'
  },
  contact: {
    msg: 'some contact data here...'
  },
  terms: {
    msg: 'some terms data here...'
  },
  terms: {
    msg: 'Trademeet wiki'
  },
  portal: {
    msg: 'some terms data here...'
  }
}

export { routes }
