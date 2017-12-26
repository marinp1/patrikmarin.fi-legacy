// Paths Aliases defined through tsconfig.json

const typescriptWebpackPaths = require('./webpack.config.js')

const projects = require('./src/data/projects.json')
const resume = require('./src/data/resume.json')

export default {
  getRoutes: async () => [
    {
      path: '/',
      component: 'src/containers/Home',
      getProps: () => ({
        projects,
        resume,
      }),
      children: projects.filter(project => project.entry !== undefined).map(project => ({
        path: `/projects/${project.id}`,
        component: 'src/containers/Project',
        getProps: () => ({
          project,
        }),
      })),
    },
    {
      is404: true,
      component: 'src/containers/404',
    },
  ],

  webpack: (config, { defaultLoaders }) => {
    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push('.ts', '.tsx')

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // to react-statics alias resolution
    config.resolve.alias = typescriptWebpackPaths.resolve.alias

    // We replace the existing JS rule with one, that allows us to use
    // both TypeScript and JavaScript interchangeably
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
            use: [
              {
                loader: 'babel-loader',
              },
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ]
    return config
  },
}
