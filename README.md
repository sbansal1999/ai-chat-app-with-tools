# AI Chat Application with AWS Bedrock

A full-featured AI chat application built with Next.js 15, integrating AWS Bedrock's Claude 3.7 Sonnet model via the Vercel AI SDK. The application features comprehensive tool integration, real-time streaming, file operations, database queries, and an intuitive user interface.

## Features

- **AWS Bedrock Integration**: Powered by Claude 3.7 Sonnet model
- **Multiple Tool Calls**: AI can use multiple tools in sequence to answer complex queries
- **Comprehensive Tool Integration**: 16 built-in tools for various use cases
- **File Operations**: Create, read, modify, and append to files
- **Database Integration**: Execute SQL queries and manage database operations
- **Clean UI**: Simplified interface with collapsible thinking sections
- **Real-time Streaming**: Live response streaming for better user experience
- **Tool Visualization**: Clear display of tool calls and results in collapsible sections
- **Pre-selected Questions**: Quick-start options showcasing multi-tool capabilities
- **Responsive Design**: Works seamlessly across all devices
- **Error Handling**: Robust error management and user feedback
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Tools Available

### Core Tools
1. **Weather Tool**: Get current weather information for any location
2. **Calculator**: Perform mathematical calculations
3. **Date Tool**: Get current date with timezone support
4. **Time Tool**: Get current time with timezone support
5. **Random Facts**: Generate interesting facts by category
6. **Search Tool**: Simulate information search with results
7. **Stock Price Tool**: Get stock prices for any symbol on a specific date

### File Operations
8. **Read File**: Read content from files
9. **Create File**: Create new files with specified content
10. **Modify File**: Modify existing file content
11. **Append to File**: Append content to existing files
12. **Create Folder**: Create new directories
13. **List Files**: List files in a specified folder

### Database Operations
14. **Execute SQL Query**: Run SQL queries against databases
15. **Get Table Metadata**: Retrieve metadata information about database tables
16. **Database Admin Notifications**: Notify database administrators about critical operations

## Prerequisites

- Node.js 18+ 
- AWS Account with Bedrock access
- pnpm (recommended) or npm for package management
- Vercel account (for deployment)

## Environment Variables

The following environment variables are required:

```env
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd aws-bedrock-chat-app
   ```

2. Install dependencies (pnpm recommended):
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Set up environment variables in `.env` from `.env.example`:
   ```bash
   cp .env.example .env
   # Edit .env to add your AWS credentials
   ```

   Ensure you have the correct AWS credentials with permissions for Bedrock.

4. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This application is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Add the required environment variables in Vercel dashboard:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
3. Deploy with one click
4. The application will automatically build and deploy

### Alternative Deployment Options

- **Docker**: Containerize using the Next.js Docker example
- **AWS**: Deploy on AWS using Amplify or EC2
- **Other platforms**: Compatible with any Node.js hosting platform

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/chat/          # Chat API endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── chat-interface.tsx # Main chat component
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities and tools
│   ├── tools/           # AI tool implementations
│   └── utils.ts         # Utility functions
├── hooks/               # Custom React hooks
└── generated/           # Generated projects (examples)
```

## AWS Bedrock Setup

1. Ensure you have access to AWS Bedrock in the us-east-1 region
2. Enable the Claude 3.7 Sonnet model in your Bedrock console
3. Create IAM credentials with appropriate Bedrock permissions:
   - `bedrock:InvokeModel`
   - `bedrock:InvokeModelWithResponseStream`

## Usage

1. Visit the application homepage at [http://localhost:3000](http://localhost:3000)
2. Choose from pre-selected questions or type your own queries
3. Watch as the AI uses various tools to provide comprehensive answers:
   - File operations (create, read, modify files and folders)
   - Database queries and metadata retrieval
   - Weather information and calculations
   - Stock prices and random facts
4. Tool calls and results are displayed in real-time with collapsible sections
5. Continue the conversation naturally - the AI maintains context across interactions
6. Use the thinking sections to understand the AI's decision-making process

## Architecture

- **Frontend**: Next.js 15 with App Router and React 19
- **AI Integration**: Vercel AI SDK with AWS Bedrock (Claude 3.7 Sonnet)
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks with AI SDK's useChat
- **API**: Next.js API routes for chat handling
- **Package Manager**: pnpm (with npm fallback support)
- **TypeScript**: Full TypeScript support with strict type checking
- **UI Components**: Comprehensive component library with Radix UI primitives

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Use the existing code style and formatting
- Add proper error handling for new tools
- Test your changes locally before submitting
- Update documentation as needed

### Adding New Tools

To add a new AI tool:

1. Create a new file in `lib/tools/`
2. Implement the tool following the existing pattern
3. Export the tool from the file
4. Import and add it to the tools object in `app/api/chat/route.ts`
5. Test the tool integration

## Troubleshooting

### Common Issues

1. **AWS Credentials Error**: Ensure your AWS credentials have the correct Bedrock permissions
2. **Model Access Error**: Verify that Claude 3.7 Sonnet is enabled in your AWS Bedrock console
3. **Build Errors**: Try deleting `node_modules` and `pnpm-lock.yaml`, then run `pnpm install`
4. **Port Already in Use**: Change the port with `pnpm dev -- -p 3001`

### Getting Help

- Check the [Issues](../../issues) page for known problems
- Create a new issue if you encounter a bug
- Join our community discussions for general questions

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vercel AI SDK](https://sdk.vercel.ai/) for the AI integration framework
- [AWS Bedrock](https://aws.amazon.com/bedrock/) for providing Claude 3.7 Sonnet
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

---

Built with ❤️ using Next.js 15, AWS Bedrock, and the Vercel AI SDK.
