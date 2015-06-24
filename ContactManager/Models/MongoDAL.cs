using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ContactManager.Models
{
    public class MongoDAL
    {
        
        private MongoServer mongoServer = null;
        private bool disposed = false;

        private string connectionString = System.Environment.GetEnvironmentVariable("CUSTOMCONNSTR_MONGOLAB_URI");
        MongoUrl url;

        private string dbName = "MJWMongoLab";
        private string collectionName = "Notes";

        // Default constructor.        
        public MongoDAL()
        {
            url = new MongoUrl(connectionString);
        }

        public List<Note> GetAllNotes()
        {
            try
            {
                IMongoCollection<Note> collection = GetNotesCollection();
                return collection.Find(note => note.Date > DateTime.MinValue).ToListAsync().Result;
            }
            catch (MongoConnectionException)
            {
                return new List<Note>();
            }
        }

        // Creates a Note and inserts it into the collection in MongoDB.
        public void CreateNote(Note note)
        {
            IMongoCollection<Note> collection = GetNotesCollectionForEdit();
            try
            {
               collection.InsertOneAsync(note);
            }
            catch (MongoCommandException ex)
            {
                string msg = ex.Message;
            }
        }

        private IMongoCollection<Note> GetNotesCollection()
        {
            //MongoClient client = new MongoClient(url);

            MongoClient client = new MongoClient();

            IMongoDatabase database = client.GetDatabase(dbName);
            IMongoCollection<Note> noteCollection = database.GetCollection<Note>(collectionName);
            return noteCollection;
        }

        private IMongoCollection<Note> GetNotesCollectionForEdit()
        {
            //MongoClient client = new MongoClient(url);
            MongoClient client = new MongoClient();
            IMongoDatabase database = client.GetDatabase(dbName);
            IMongoCollection<Note> notesCollection = database.GetCollection<Note>(collectionName);
            return notesCollection;
        }

        # region IDisposable

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    if (mongoServer != null)
                    {
                        this.mongoServer.Disconnect();
                    }
                }
            }

            this.disposed = true;
        }

        # endregion
    }
}