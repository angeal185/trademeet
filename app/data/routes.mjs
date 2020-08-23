const routes = {
  base: {
    nav: ['portal', 'forum', 'hub', 'news', 'wiki', 'terms', 'contact'],
    nav_sb: ['portal', 'forum', 'hub', 'news', 'wiki','terms', 'contact'],
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
    msg: 'Trademeet forum'
  },
  news: {
    msg: 'Trademeet news'
  },
  contact: {
    msg: 'some contact data here...'
  },
  terms: {
    msg: 'some terms data here...'
  },
  wiki: {
    msg: 'Trademeet wiki'
  },
  portal: {
    list: [{
      title:'forum',
      description: 'forum description',
      dest: '/forum'
    },{
      title: 'hub',
      description: 'hub description',
      dest: '/hub'
    },{
      title: 'wiki',
      description: 'wiki description',
      dest: '/wiki'
    },{
      title: 'news',
      description: 'news description',
      dest: '/news'
    },{
      title: 'terms',
      description: 'terms description',
      dest: '/terms'
    },{
      title: 'contact',
      description: 'contact description',
      dest: '/contact'
    },{
      title: 'atom feed',
      description: 'atom feed description',
      dest: '/atom'
    }]
  }
}

export { routes }
