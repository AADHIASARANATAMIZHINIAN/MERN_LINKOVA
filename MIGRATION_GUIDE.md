# 🔄 Migration Guide - LINKOVA v2.0

## For Existing Users

### Database Compatibility
The new version is **backward compatible** with existing data. Existing users without avatars will:
- Display their name initial in a colored circle
- Can add an avatar by editing their profile
- Existing posts and comments will work normally

### New Fields (Optional)
Existing users can optionally add:
- **Location** - Where you're based
- **Occupation** - Your job title or role
- **Website** - Your personal or professional site

### For New Users
New users **must** select an avatar during signup from the 12 available cartoon options.

## Backend Migration (if needed)

If you want to add default avatars to existing users, run this MongoDB command:

```javascript
// Optional: Assign random avatars to existing users without one
db.users.find({ avatar: { $in: ['', null] } }).forEach(function(user) {
  const avatars = [
    'avatar-1', 'avatar-2', 'avatar-3', 'avatar-4',
    'avatar-5', 'avatar-6', 'avatar-7', 'avatar-8',
    'avatar-9', 'avatar-10', 'avatar-11', 'avatar-12'
  ];
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
  db.users.updateOne(
    { _id: user._id },
    { $set: { avatar: randomAvatar } }
  );
});
```

## Deployment Steps

### 1. Backend Deployment
```bash
cd backend
npm install
# Update environment variables if needed
npm start
```

### 2. Frontend Deployment
```bash
cd frontend
npm install
npm run build
# Deploy build folder to your hosting service
```

### 3. Verification
- [ ] Test signup with avatar selection
- [ ] Test existing user login
- [ ] Verify profile editing
- [ ] Check post creation with new UI
- [ ] Test avatar display in posts and comments

## Environment Variables
No new environment variables required! All changes work with existing configuration.

## Rollback Plan
If issues occur:
1. Keep backend database as-is (new fields are optional)
2. Redeploy previous frontend version
3. New avatar/profile fields will be ignored by old frontend

## Support
- New users: Avatar selection is required
- Existing users: Can continue without changes or add avatar via profile edit
- All features are additive, not breaking
