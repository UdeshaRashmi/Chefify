import { useState } from 'react'
import BlogPostForm from '../components/admin/BlogPostForm'
import FAQForm from '../components/admin/FAQForm'
import BlogPostList from '../components/admin/BlogPostList'
import FAQList from '../components/admin/FAQList'

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState('blog')
  const [searchQuery, setSearchQuery] = useState('')
  const [showBlogPostForm, setShowBlogPostForm] = useState(false)
  const [showFaqForm, setShowFaqForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [editingFaq, setEditingFaq] = useState(null)
  
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: "5 Tips for Perfect Pasta", author: "Chef Maria", date: "2025-11-20", status: "Published", views: 1242 },
    { id: 2, title: "Healthy Cooking on a Budget", author: "Chef James", date: "2025-11-15", status: "Published", views: 987 },
    { id: 3, title: "Seasonal Ingredients Guide", author: "Chef Alex", date: "2025-11-10", status: "Draft", views: 0 },
    { id: 4, title: "Mastering Knife Skills", author: "Chef Sarah", date: "2025-11-05", status: "Published", views: 1567 }
  ])
  
  const [faqs, setFaqs] = useState([
    { id: 1, question: "How do I submit a recipe?", category: "Recipes", status: "Active" },
    { id: 2, question: "What are the image requirements?", category: "Technical", status: "Active" },
    { id: 3, question: "How long does review take?", category: "Recipes", status: "Active" },
    { id: 4, question: "Can I edit my published recipes?", category: "Recipes", status: "Draft" }
  ])

  const filteredBlogPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleEditBlogPost = (post) => {
    setEditingPost(post)
    setShowBlogPostForm(true)
  }

  const handleDeleteBlogPost = (post) => {
    if (window.confirm(`Are you sure you want to delete the blog post "${post.title}"?`)) {
      setBlogPosts(blogPosts.filter(p => p.id !== post.id))
      alert(`Blog post "${post.title}" deleted successfully!`)
    }
  }

  const handleEditFaq = (faq) => {
    setEditingFaq(faq)
    setShowFaqForm(true)
  }

  const handleDeleteFaq = (faq) => {
    if (window.confirm(`Are you sure you want to delete the FAQ "${faq.question}"?`)) {
      setFaqs(faqs.filter(f => f.id !== faq.id))
      alert(`FAQ "${faq.question}" deleted successfully!`)
    }
  }

  const handleNewContent = () => {
    if (activeTab === 'blog') {
      setEditingPost(null)
      setShowBlogPostForm(true)
    } else {
      setEditingFaq(null)
      setShowFaqForm(true)
    }
  }

  const handleSaveBlogPost = (postData) => {
    if (editingPost) {
      // Update existing post
      setBlogPosts(blogPosts.map(post => 
        post.id === postData.id ? { ...postData } : post
      ))
      alert(`Blog post "${postData.title}" updated successfully!`)
    } else {
      // Create new post
      const newPost = {
        ...postData,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        views: 0
      }
      setBlogPosts([...blogPosts, newPost])
      alert(`Blog post "${postData.title}" created successfully!`)
    }
    setShowBlogPostForm(false)
    setEditingPost(null)
  }

  const handleSaveFaq = (faqData) => {
    if (editingFaq) {
      // Update existing FAQ
      setFaqs(faqs.map(faq => 
        faq.id === faqData.id ? { ...faqData } : faq
      ))
      alert(`FAQ "${faqData.question}" updated successfully!`)
    } else {
      // Create new FAQ
      const newFaq = {
        ...faqData,
        id: Date.now()
      }
      setFaqs([...faqs, newFaq])
      alert(`FAQ "${faqData.question}" created successfully!`)
    }
    setShowFaqForm(false)
    setEditingFaq(null)
  }

  const handleAddCategory = () => {
    alert("Adding new category...\nIn a real application, this would open a category creation form.")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Content Manager</h1>
          <p className="text-gray-600 mt-2">Manage blog posts, FAQs, and other site content</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={handleNewContent}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            + New Content
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search content..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'blog'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Blog Posts
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'faq'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              FAQs
            </button>
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {activeTab === 'blog' && (
          <BlogPostList 
            posts={filteredBlogPosts} 
            onEdit={handleEditBlogPost} 
            onDelete={handleDeleteBlogPost} 
          />
        )}

        {activeTab === 'faq' && (
          <FAQList 
            faqs={filteredFaqs} 
            onEdit={handleEditFaq} 
            onDelete={handleDeleteFaq} 
          />
        )}
      </div>

      {/* Content Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Content Categories</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-800">Recipes</span>
              <span className="text-sm text-gray-500">24 posts</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-800">Cooking Tips</span>
              <span className="text-sm text-gray-500">18 posts</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-800">Nutrition</span>
              <span className="text-sm text-gray-500">12 posts</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-800">Kitchen Tools</span>
              <span className="text-sm text-gray-500">9 posts</span>
            </div>
          </div>
          <button 
            onClick={handleAddCategory}
            className="mt-4 w-full text-center text-orange-600 hover:text-orange-700 font-medium py-2 rounded-lg border border-dashed border-orange-300 hover:border-orange-400"
          >
            + Add Category
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Blog Posts</span>
              <span className="font-semibold text-gray-900">{blogPosts.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Published Posts</span>
              <span className="font-semibold text-green-600">{blogPosts.filter(p => p.status === 'Published').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Draft Posts</span>
              <span className="font-semibold text-yellow-600">{blogPosts.filter(p => p.status === 'Draft').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total FAQs</span>
              <span className="font-semibold text-gray-900">{faqs.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showBlogPostForm && (
        <BlogPostForm 
          post={editingPost}
          onClose={() => {
            setShowBlogPostForm(false)
            setEditingPost(null)
          }}
          onSave={handleSaveBlogPost}
        />
      )}
      
      {showFaqForm && (
        <FAQForm 
          faq={editingFaq}
          onClose={() => {
            setShowFaqForm(false)
            setEditingFaq(null)
          }}
          onSave={handleSaveFaq}
        />
      )}
    </div>
  )
}

export default ContentManager