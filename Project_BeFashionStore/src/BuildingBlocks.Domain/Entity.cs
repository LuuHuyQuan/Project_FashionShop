namespace BuildingBlocks.Domain;

public abstract class Entity<TId>
{
    public TId Id { get; protected set; } = default!;
}

public interface IAuditableEntity
{
    DateTime CreatedAt { get; }
    DateTime? UpdatedAt { get; }
    void SetUpdatedAt(DateTime updatedAt);
}

public abstract class AuditableEntity<TId> : Entity<TId>, IAuditableEntity
{
    public DateTime CreatedAt { get; protected set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; protected set; }

    public void SetUpdatedAt(DateTime updatedAt)
    {
        UpdatedAt = updatedAt;
    }
}
