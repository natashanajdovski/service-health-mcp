# <img src="assets/favicon.png" alt="Service Health MCP Server" width="32" height="32"> Service Health MCP Server

> **🚀 The first universal service health monitoring tool for Claude Desktop and MCP-compatible AI assistants**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue?style=for-the-badge)](https://github.com/modelcontextprotocol)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Security](https://img.shields.io/badge/Security-SSRF%20Protected-green?style=for-the-badge)](#-security)
[![AI Built](https://img.shields.io/badge/Built%20with-Claude%20AI-purple?style=for-the-badge)](#-transparency--learning)

**A professional-grade MCP server that enables AI assistants to monitor web services, APIs, and HTTP endpoints with enterprise-level security.** Perfect for DevOps, monitoring, and ensuring your services are running smoothly.

---

## 🎓 **Transparency & Learning**

**🤖 Built with AI Assistance:** This project was created by [Natasha](https://github.com/natashanajdovski) in collaboration with Claude Sonnet 4 as a learning exercise. No prior MCP server development experience was required!

**📚 Learning Goals Achieved:**
- ✅ **MCP Protocol Implementation** - From zero to working server
- ✅ **TypeScript Best Practices** - Professional code structure
- ✅ **Security-First Development** - Enterprise-grade SSRF protection
- ✅ **Open Source Standards** - Community-ready documentation
- ✅ **Real-World Problem Solving** - Filling a genuine gap in the MCP ecosystem

**💡 For Fellow Learners:** If you're new to MCP development or curious about AI-assisted programming, this project demonstrates what's possible when learning with AI guidance. See our [development process](#-development) and [contributing guidelines](CONTRIBUTING.md) for insights!

---

## ✨ **Why This Exists**

**The Goal:** While learning MCP development, I wanted to build something that would be genuinely useful for monitoring services through AI conversations. This MCP server provides a convenient way for Claude (and other AI assistants) to check service health naturally through chat.

**What Makes It Useful:**
- 🔍 **Conversational monitoring** - Check services through natural language
- 🛡️ **Security-first design** with comprehensive SSRF protection
- ⚡ **Fast and reliable** with detailed diagnostics
- 🎯 **Easy to use** - works out of the box with Claude Desktop
- 📊 **Professional output** with actionable information

---

## 🚀 **Quick Start**

### **Step 1: Install**
```bash
git clone https://github.com/natashanajdovski/service-health-mcp.git
cd service-health-mcp
npm install
npm run build
```

### **Step 2: Configure Claude Desktop**

**Find your config file:**
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
- **Linux:** `~/.config/Claude/claude_desktop_config.json`

**Add this configuration:**
```json
{
  "mcpServers": {
    "service-health": {
      "command": "node",
      "args": ["C:\\path\\to\\service-health-mcp\\dist\\server.js"],
      "cwd": "C:\\path\\to\\service-health-mcp"
    }
  }
}
```

### **Step 3: Restart & Test**
1. **Completely close and reopen Claude Desktop**
2. **Test with:** `"Check if google.com is healthy"`
3. **See professional health reports instantly! 🎉**

---

## 🎯 **Usage Examples**

### **Basic Health Monitoring**
```
📝 "Check if google.com is healthy"
📝 "Is api.github.com responding properly?"
📝 "Test if my-website.com is up"
```

### **Advanced Configurations**
```
📝 "Check if api.example.com/health is healthy with a 15 second timeout"
📝 "Test httpbin.org/post using POST method"
📝 "Check if my-api.com returns 201 status code"
```

### **DevOps & Monitoring**
```
📝 "Check if our production API is responding normally"
📝 "Test all our microservices for health"
📝 "Monitor our CDN endpoints"
```

---

## 📊 **Sample Output**

```
✅ **Health Check Result**

**URL:** https://api.github.com
**Status:** HEALTHY
**Response Time:** 127ms  
**HTTP Status:** 200 (OK)
**Message:** Endpoint is healthy (200) - 127ms response time
**Checked At:** 2024-07-24T21:30:00.000Z

**Interpretation:**
🎉 The endpoint is working perfectly! No issues detected.
```

**For unhealthy services:**
```
❌ **Health Check Result**

**URL:** https://down-service.com
**Status:** UNHEALTHY
**Response Time:** 5000ms
**Message:** Network error: Connection timeout
**Checked At:** 2024-07-24T21:30:00.000Z

**Interpretation:**
🚨 The endpoint has issues and may be down or misconfigured. Investigation needed.
```

---

## 🛠️ **Features**

<table>
<tr>
<td width="50%">

### **🔍 Health Monitoring**
- ✅ HTTP/HTTPS endpoint testing
- ✅ Response time measurement  
- ✅ Status code validation
- ✅ Custom headers support
- ✅ Multiple HTTP methods
- ✅ Configurable timeouts (1-30s)

</td>
<td width="50%">

### **🛡️ Enterprise Security**
- ✅ SSRF attack prevention
- ✅ Internal network blocking
- ✅ Input validation & sanitization
- ✅ Protocol restrictions (HTTP/HTTPS only)
- ✅ Port filtering & safe defaults
- ✅ Zero credential exposure

</td>
</tr>
<tr>
<td width="50%">

### **⚡ Performance**
- ✅ Sub-second response times
- ✅ Efficient connection handling
- ✅ Minimal resource usage
- ✅ Non-blocking async operations
- ✅ Optimized error handling
- ✅ Smart retry logic

</td>
<td width="50%">

### **🔧 Developer Experience**
- ✅ Full TypeScript support
- ✅ Professional error messages
- ✅ Comprehensive logging
- ✅ Easy MCP integration
- ✅ Hot reload development
- ✅ Extensive documentation

</td>
</tr>
</table>

---

## 🛡️ **Security**

**This MCP server implements enterprise-grade security to prevent attacks:**

### **🚨 SSRF (Server-Side Request Forgery) Protection**
```
❌ BLOCKED: localhost, 127.0.0.1
❌ BLOCKED: 192.168.x.x, 10.x.x.x, 172.16-31.x.x  
❌ BLOCKED: 169.254.169.254 (cloud metadata)
❌ BLOCKED: Non-HTTP protocols (ftp, file, etc.)
✅ ALLOWED: Public HTTP/HTTPS endpoints only
```

### **🔒 Input Validation**
- **URL Format:** RFC-compliant validation
- **Parameter Types:** Strict type checking with Zod
- **Timeout Bounds:** 1-30 second limits
- **Method Restrictions:** GET, POST, PUT, DELETE only
- **Port Filtering:** Standard web ports (80, 443, 8080, 8443)

### **🛡️ Safe Defaults**
- **10-second timeout** (prevents hanging)
- **GET method** (least intrusive)
- **No credential storage** (stateless operation)
- **Minimal error details** (no information leakage)

---

## 🔧 **Development**

### **Prerequisites**
- **Node.js 18+** 
- **TypeScript 5+**
- **npm or yarn**

### **Development Commands**
```bash
npm run dev    # 🔄 Hot reload development
npm run build  # 🏗️ Production build  
npm run start  # 🚀 Run built version
npm run clean  # 🧹 Clean build files
```

### **Testing with MCP Inspector**
```bash
npx @modelcontextprotocol/inspector src/server.ts
```

### **Project Structure**
```
service-health-mcp/
├── src/
│   ├── server.ts           # 🎯 Main MCP server
│   ├── health/
│   │   └── http-checker.ts # 🔍 Core health logic  
│   ├── security/
│   │   └── url-validator.ts # 🛡️ SSRF protection
│   └── tools/
│       └── check-http.ts   # 🛠️ MCP tool interface
├── dist/                   # 📦 Compiled JavaScript
├── docs/                   # 📚 Documentation
└── package.json           # 📋 Project config
```

---

## 📚 **API Reference**

### **`check_http_endpoint`**

**Description:** Check if an HTTP/HTTPS endpoint is healthy and responsive.

#### **Parameters**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `url` | `string` | ✅ Yes | - | The URL to check (e.g., https://google.com) |
| `method` | `"GET" \| "POST" \| "PUT" \| "DELETE"` | ❌ No | `"GET"` | HTTP method to use |
| `timeout` | `number` | ❌ No | `10000` | Request timeout in milliseconds (1000-30000) |
| `expectedStatus` | `number` | ❌ No | `200` | Expected HTTP status code (100-599) |
| `headers` | `Record<string, string>` | ❌ No | `{}` | Optional HTTP headers |

#### **Example Request**
```json
{
  "url": "https://api.example.com/health",
  "method": "GET", 
  "timeout": 15000,
  "expectedStatus": 200,
  "headers": {
    "User-Agent": "Health-Checker/1.0",
    "Accept": "application/json"
  }
}
```

#### **Response Format**
```typescript
{
  status: "healthy" | "unhealthy" | "warning";
  responseTime: number;          // milliseconds
  statusCode?: number;           // HTTP status code
  message: string;               // Human-readable description
  details: {
    url: string;
    timestamp: string;           // ISO 8601 format
    error?: string;              // Error details if applicable
  }
}
```

---

## 🔄 **Troubleshooting**

### **❓ Tool Not Appearing in Claude Desktop**

**Problem:** Claude doesn't recognize the health check tool.

**Solutions:**
1. **Verify config syntax:** Use a JSON validator
2. **Check file paths:** Use absolute paths in config
3. **Restart completely:** Close Claude Desktop entirely, then reopen
4. **Test build:** Run `npm run build` and check for errors
5. **Check permissions:** Ensure Node.js can read the files

### **🌐 Network Connection Issues**

**Problem:** Getting network errors or timeouts.

```
❌ Network error: Client network socket disconnected
```

**Solutions:**
- **Service may be down:** Try checking in browser first
- **HTTPS issues:** Try HTTP version of the URL
- **Firewall:** Check if your network blocks the service
- **DNS:** Verify the domain resolves correctly

### **🔒 Security Restriction Messages**

**Problem:** URLs being blocked for security reasons.

```
❌ Access to internal networks and localhost is not allowed
```

**This is intentional!** The security system is working correctly:
- **For local testing:** Use browser or `curl` directly
- **For monitoring:** Use external, publicly accessible URLs only
- **For internal services:** Deploy monitoring within your network

### **⚡ Performance Issues**

**Problem:** Slow response times or timeouts.

**Solutions:**
- **Increase timeout:** Use 15-30 second timeouts for slow services
- **Check network:** Test connectivity to the target service
- **Reduce load:** Avoid checking too many endpoints simultaneously

---

## 🤝 **Contributing**

**We welcome contributors of all skill levels!** This project was built by a learner with AI assistance, and we're excited to grow the community.

### **🌟 Ways to Contribute**
- **🐛 Bug Reports:** Found an issue? Please report it!
- **✨ Feature Requests:** Ideas for new capabilities?
- **📖 Documentation:** Help improve our guides
- **🔧 Code:** Submit pull requests for enhancements
- **🎓 Learning:** Share your experience using this project

### **🚀 Getting Started**
1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/yourusername/service-health-mcp.git`
3. **Create branch:** `git checkout -b feature/amazing-feature`
4. **Make changes** and test thoroughly
5. **Commit:** `git commit -m "Add amazing feature"`
6. **Push:** `git push origin feature/amazing-feature`  
7. **Open Pull Request** with detailed description

### **📋 Contribution Guidelines**
- **Code Style:** Follow existing TypeScript patterns
- **Security:** Maintain SSRF protection standards
- **Tests:** Add tests for new features
- **Documentation:** Update docs for any changes
- **Commit Messages:** Use clear, descriptive commits

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 🗺️ **Roadmap**

### **🎯 Phase 1: Core Stability** *(Current)*
- ✅ HTTP/HTTPS health checking
- ✅ Enterprise security (SSRF protection)
- ✅ Claude Desktop integration
- ✅ Professional documentation

### **🎯 Phase 2: Database Support** *(Next)*
- 🔄 PostgreSQL health checking
- 🔄 MySQL/MariaDB support
- 🔄 Redis connectivity testing
- 🔄 MongoDB health monitoring

### **🎯 Phase 3: Advanced Features**
- 📊 Multi-service dashboards
- 📈 Health history tracking
- 🔔 Webhook notifications
- ⏰ Scheduled monitoring

### **🎯 Phase 4: Enterprise**
- ☁️ Cloud integration (AWS, Azure, GCP)
- 🐳 Docker containerization
- 🔐 Authentication support
- 📊 Prometheus metrics export

**💡 Community Input Welcome!** Open an issue to suggest features or vote on priorities.

---

## 📜 **License**

**MIT License** - see [LICENSE](LICENSE) file for details.

**TL;DR:** You can use, modify, and distribute this project freely. Just include the license notice.

---

## 🙏 **Acknowledgments**

- **🤖 Anthropic** for Claude AI assistance and the MCP protocol
- **🏗️ MCP Community** for pioneering this ecosystem  
- **🌟 Open Source Contributors** who make projects like this possible
- **📚 Learning Community** for encouraging AI-assisted development

---

## 📞 **Support & Community**

### **📚 Documentation**
- **[Quick Start Guide](#-quick-start)** - Complete installation instructions
- **[Development Setup](#-development)** - For developers new to MCP
- **[API Reference](#-api-reference)** - Complete technical documentation
- **[Security Details](#-security)** - Security considerations and best practices

### **💬 Get Help**
- **🐛 [Issues](https://github.com/natashanajdovski/service-health-mcp/issues)** - Bug reports and feature requests
- **💭 [Discussions](https://github.com/natashanajdovski/service-health-mcp/discussions)** - Community Q&A and ideas

### **🔗 Connect**
- **👩‍💻 [GitHub Profile](https://github.com/natashanajdovski)** - Follow for updates

---

<div align="center">

**🚀 Built with ❤️, TypeScript, and Claude AI | Making service monitoring accessible to everyone**

⭐ **Star this repo if it helped you!** ⭐

</div>