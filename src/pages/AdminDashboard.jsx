import { useState } from "react";
import { useData } from "../context/DataContext";
import { FormInput, FormTextarea, FormSelect, Button, ListItem } from "../components/forms/FormComponents";

export default function AdminDashboard() {
  const { data, updateMe, addPub, updatePub, deletePub, addPost, updatePost, deletePost, addOpenSourceProject, updateOpenSourceProject, deleteOpenSourceProject } = useData();
  const [tab, setTab] = useState("personal");
  const [editId, setEditId] = useState(null);
  
  const [personal, setPersonal] = useState(data.me);
  const [pub, setPub] = useState({ year: new Date().getFullYear(), title: "", authors: [], venue: "", badges: [], type: "conference", links: [], preview: null });
  const [post, setPost] = useState({ date: new Date().toISOString().split("T")[0], title: "", excerpt: "", tags: [], url: "#" });
  const [project, setProject] = useState({ title: "", description: "", stars: 0, language: "", link: "" });

  // Personal handlers
  const savePersonal = () => {
    updateMe(personal);
    alert("✓ Personal info updated");
  };

  const updateBio = (i, val) => setPersonal(p => ({ ...p, bio: p.bio?.map((b, idx) => idx === i ? val : b) }));

  // Publication handlers
  const resetPubForm = () => setPub({ year: new Date().getFullYear(), title: "", authors: [], venue: "", badges: [], type: "conference", links: [], preview: null });

  const savePub = () => {
    if (!pub.title) return alert("Enter title");
    editId ? updatePub(editId, pub) : addPub(pub);
    alert(`✓ Publication ${editId ? "updated" : "added"}`);
    setEditId(null);
    resetPubForm();
  };

  const editPub = (p) => { setPub(p); setEditId(p.id); };
  const handleDeletePub = (id) => { if (confirm("Delete?")) deletePub(id); };

  const addAuthor = () => setPub(p => ({ ...p, authors: [...p.authors, { name: "", self: false, star: false }] }));
  const updateAuthor = (i, field, val) => setPub(p => ({ 
    ...p, 
    authors: p.authors.map((a, idx) => idx === i ? { ...a, [field]: val } : a) 
  }));
  const removeAuthor = (i) => setPub(p => ({ ...p, authors: p.authors.filter((_, idx) => idx !== i) }));

  // Blog handlers
  const resetPostForm = () => setPost({ date: new Date().toISOString().split("T")[0], title: "", excerpt: "", tags: [], url: "#" });

  const savePost = () => {
    if (!post.title) return alert("Enter title");
    editId ? updatePost(editId, post) : addPost(post);
    alert(`✓ Post ${editId ? "updated" : "added"}`);
    setEditId(null);
    resetPostForm();
  };

  const editPost = (p) => { setPost(p); setEditId(p.id); };
  const handleDeletePost = (id) => { if (confirm("Delete?")) deletePost(id); };

  const addTag = () => setPost(p => ({ ...p, tags: [...p.tags, ""] }));
  const updateTag = (i, val) => setPost(p => ({ ...p, tags: p.tags.map((t, idx) => idx === i ? val : t) }));
  const removeTag = (i) => setPost(p => ({ ...p, tags: p.tags.filter((_, idx) => idx !== i) }));

  // Open Source handlers
  const resetProjectForm = () => setProject({ title: "", description: "", stars: 0, language: "", link: "" });

  const saveProject = () => {
    if (!project.title || !project.link) return alert("Enter title and link");
    editId ? updateOpenSourceProject(editId, project) : addOpenSourceProject(project);
    alert(`✓ Project ${editId ? "updated" : "added"}`);
    setEditId(null);
    resetProjectForm();
  };

  const editProject = (p) => { setProject(p); setEditId(p.id); };
  const handleDeleteProject = (id) => { if (confirm("Delete?")) deleteOpenSourceProject(id); };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="font-garamond text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {["personal", "publications", "blog", "open source"].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 font-semibold border-b-2 ${tab === t ? "border-accent text-accent" : "border-transparent text-gray-600"}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* PERSONAL TAB */}
        {tab === "personal" && (
          <div className="bg-white rounded-lg p-8 shadow">
            <h2 className="text-2xl font-bold mb-8">My Profile</h2>

            {/* Avatar Preview with Edit Button */}
            <div className="mb-8 flex flex-col items-center">
              <div className="relative group">
                <div className="w-56 h-56 rounded-lg border-4 border-accent bg-gray-100 flex items-center justify-center overflow-hidden">
                  {personal?.avatar ? (
                    <img src={personal.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-garamond text-5xl text-gray-400 font-semibold">{personal?.initials}</span>
                  )}
                </div>
                <label 
                  htmlFor="avatarFile"
                  className="absolute bottom-0 right-0 bg-accent hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all cursor-pointer"
                  title="Click to edit avatar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </label>
              </div>
              <p className="mt-4 text-sm text-gray-600 font-semibold">Click the edit icon to add/change your picture</p>
            </div>

            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-900 mb-2"><strong>📸 How to add your picture:</strong></p>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Click "Choose Image" button below</li>
                <li>Select an image from your computer (.jpg, .png, etc.)</li>
                <li>You'll see a preview update above</li>
                <li>Click "Save Changes" to store it</li>
              </ol>
              <p className="text-xs text-blue-700 mt-2">File size limit: 5MB recommended</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Choose Image</label>
              <input 
                id="avatarFile"
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setPersonal(p => ({ ...p, avatar: event.target?.result }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-blue-700"
              />
            </div>

            <FormInput label="Name" value={personal?.name} onChange={val => setPersonal(p => ({ ...p, name: val }))} />
            <FormInput label="Role" value={personal?.role} onChange={val => setPersonal(p => ({ ...p, role: val }))} />
            
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Bio (Paragraphs)</label>
              {personal?.bio?.map((para, i) => (
                <FormTextarea key={i} value={para} onChange={val => updateBio(i, val)} />
              ))}
            </div>

            <Button onClick={savePersonal}>✓ Save Changes</Button>
          </div>
        )}

        {/* PUBLICATIONS TAB */}
        {tab === "publications" && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-8 shadow">
              <h2 className="text-2xl font-bold mb-6">{editId ? "Edit" : "Add"} Publication</h2>

              <div className="grid grid-cols-2 gap-6">
                <FormInput type="number" label="Year" value={pub.year} onChange={val => setPub(p => ({ ...p, year: parseInt(val) }))} />
                <FormSelect label="Type" value={pub.type} onChange={val => setPub(p => ({ ...p, type: val }))} options={["conference", "journal", "workshop"]} />
              </div>

              <FormInput label="Title" value={pub.title} onChange={val => setPub(p => ({ ...p, title: val }))} />
              <FormInput label="Venue" value={pub.venue} onChange={val => setPub(p => ({ ...p, venue: val }))} />

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Authors</label>
                {pub.authors?.map((a, i) => (
                  <div key={i} className="flex gap-2 mb-3">
                    <input type="text" placeholder="Name" value={a.name} onChange={e => updateAuthor(i, "name", e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded" />
                    <label className="flex items-center"><input type="checkbox" checked={a.self} onChange={e => updateAuthor(i, "self", e.target.checked)} className="mr-1" /> Self</label>
                    <label className="flex items-center"><input type="checkbox" checked={a.star} onChange={e => updateAuthor(i, "star", e.target.checked)} className="mr-1" /> Star</label>
                    <Button onClick={() => removeAuthor(i)} variant="danger">✕</Button>
                  </div>
                ))}
                <Button onClick={addAuthor} variant="small">+ Author</Button>
              </div>

              <div className="flex gap-4">
                <Button onClick={savePub}>{editId ? "Update" : "Add"} Pub</Button>
                {editId && <Button onClick={() => { setEditId(null); resetPubForm(); }} variant="secondary">Cancel</Button>}
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow">
              <h3 className="text-xl font-bold mb-4">Publications ({data.publications?.length || 0})</h3>
              <div className="space-y-4">
                {data.publications?.map(p => (
                  <ListItem key={p.id} title={p.title} subtitle={`${p.venue} • ${p.year}`} onEdit={() => editPub(p)} onDelete={() => handleDeletePub(p.id)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BLOG TAB */}
        {tab === "blog" && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-8 shadow">
              <h2 className="text-2xl font-bold mb-6">{editId ? "Edit" : "Create"} Post</h2>

              <div className="grid grid-cols-2 gap-6">
                <FormInput type="date" label="Date" value={post.date} onChange={val => setPost(p => ({ ...p, date: val }))} />
                <FormInput label="URL" value={post.url} onChange={val => setPost(p => ({ ...p, url: val }))} placeholder="https://..." />
              </div>

              <FormInput label="Title" value={post.title} onChange={val => setPost(p => ({ ...p, title: val }))} />
              <FormTextarea label="Excerpt" value={post.excerpt} onChange={val => setPost(p => ({ ...p, excerpt: val }))} rows="4" />

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Tags</label>
                {post.tags?.map((t, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" placeholder="Tag" value={t} onChange={e => updateTag(i, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded" />
                    <Button onClick={() => removeTag(i)} variant="danger">✕</Button>
                  </div>
                ))}
                <Button onClick={addTag} variant="small">+ Tag</Button>
              </div>

              <div className="flex gap-4">
                <Button onClick={savePost}>{editId ? "Update" : "Create"} Post</Button>
                {editId && <Button onClick={() => { setEditId(null); resetPostForm(); }} variant="secondary">Cancel</Button>}
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow">
              <h3 className="text-xl font-bold mb-4">Blog Posts ({data.blogPosts?.length || 0})</h3>
              <div className="space-y-4">
                {data.blogPosts?.map(p => (
                  <ListItem key={p.id} title={p.title} subtitle={p.date} onEdit={() => editPost(p)} onDelete={() => handleDeletePost(p.id)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OPEN SOURCE TAB */}
        {tab === "open source" && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-8 shadow">
              <h2 className="text-2xl font-bold mb-6">{editId ? "Edit" : "Add"} Open Source Project</h2>

              <FormInput label="Project Title" value={project.title} onChange={val => setProject(p => ({ ...p, title: val }))} />
              <FormTextarea label="Description" value={project.description} onChange={val => setProject(p => ({ ...p, description: val }))} rows="3" />
              
              <div className="grid grid-cols-2 gap-6">
                <FormInput type="number" label="GitHub Stars" value={project.stars} onChange={val => setProject(p => ({ ...p, stars: parseInt(val) || 0 }))} />
                <FormInput label="Language" value={project.language} onChange={val => setProject(p => ({ ...p, language: val }))} placeholder="Python, JavaScript, etc." />
              </div>

              <FormInput label="GitHub Link" value={project.link} onChange={val => setProject(p => ({ ...p, link: val }))} placeholder="https://github.com/username/repo" />

              <div className="flex gap-4">
                <Button onClick={saveProject}>{editId ? "Update" : "Add"} Project</Button>
                {editId && <Button onClick={() => { setEditId(null); resetProjectForm(); }} variant="secondary">Cancel</Button>}
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow">
              <h3 className="text-xl font-bold mb-4">Projects ({data?.openSource?.length || 0})</h3>
              {data?.openSource?.length === 0 ? (
                <p className="text-sm text-gray-400">No projects added yet.</p>
              ) : (
                <div className="space-y-4">
                  {data?.openSource?.map(p => (
                    <ListItem key={p.id} title={p.title} subtitle={`${p.language} • ⭐ ${p.stars}`} onEdit={() => editProject(p)} onDelete={() => handleDeleteProject(p.id)} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
