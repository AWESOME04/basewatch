import { Post } from '../interfaces/Post';
import PostImage from '../assets/galemsey-image.svg';

const posts: Post[] = [
  {
    author: {
      name: 'Devon Lane',
      username: 'johndue',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    content: '🚨 Galamsey Alert in Ghana🇬🇭\nIllegal mining is destroying our lands, rivers, and forests 😢💔. We must protect our environment for future generations 🌱🌳. Let\'s stand together and say NO to galamsey! 🛑 #StopGalamsay #SaveOurLand #ProtectOurFuture',
    image: PostImage,
    timestamp: '23s',
    comments: 61,
    retweets: 61,
    likes: 6200
  },
  {
    author: {
      name: 'Esther Howard',
      username: 'estherh',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    content: 'Just attended a community meeting on combating illegal mining. It\'s inspiring to see so many people coming together to protect our environment. We can make a difference! #CommunityAction #StopIllegalMining',
    image: PostImage,
    timestamp: '2h',
    comments: 28,
    retweets: 45,
    likes: 189
  },
  {
    author: {
      name: 'Cameron Williamson',
      username: 'camwill',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    content: 'New drone footage reveals the extent of damage caused by illegal mining in the Western Region. It\'s heartbreaking to see our beautiful landscapes destroyed. We need stricter enforcement and community vigilance. #EnvironmentalDestruction #SaveGhana',
    image: PostImage,
    timestamp: '5h',
    comments: 92,
    retweets: 156,
    likes: 503
  }
];

export default posts;